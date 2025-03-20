package cmd

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"cosmossdk.io/log"
	cmbtcfg "github.com/cometbft/cometbft/config"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/server"
	serverconfig "github.com/cosmos/cosmos-sdk/server/config"
	simtestutil "github.com/cosmos/cosmos-sdk/testutil/sims"
	"github.com/hippocrat-dao/hippo-protocol/app"
	"github.com/spf13/cobra"
	"github.com/stretchr/testify/require"
)

func TestNewRootCmd(t *testing.T) {
	// Create root command
	rootCmd := NewRootCmd()

	// Check basic properties
	require.NotNil(t, rootCmd, "rootCmd should not be nil")
	require.IsType(t, &cobra.Command{}, rootCmd, "rootCmd should be of type *cobra.Command")
	require.Equal(t, "hippod", rootCmd.Use, "Command name should be 'hippod'")
	require.NotEmpty(t, rootCmd.Commands(), "rootCmd should have subcommands")
	require.Equal(t, "Hippo App", rootCmd.Short, "Command name should be 'Hippo App'")

	// Mock PersistentPreRunE to simulate no error (success path)
	mockPersistentPreRun := func(cmd *cobra.Command, args []string) error {
		// Simulate no error (success case)
		return nil
	}

	// Set PersistentPreRunE to the mock function for testing
	rootCmd.PersistentPreRunE = mockPersistentPreRun

	// Run the command with a mocked environment and check that no error occurs
	err := rootCmd.ExecuteContext(context.Background())
	require.NoError(t, err, "Execute should not return an error")

	// Now, simulate a failure scenario for PersistentPreRunE
	// Mock PersistentPreRunE to simulate an error condition
	mockPersistentPreRun = func(cmd *cobra.Command, args []string) error {
		return fmt.Errorf("mock error in PersistentPreRunE")
	}

	// Set PersistentPreRunE to the mock function with the error case
	rootCmd.PersistentPreRunE = mockPersistentPreRun

	// Run the command again and verify that an error occurs
	err = rootCmd.ExecuteContext(context.Background())
	require.Error(t, err, "Execute should return an error")
	require.Contains(t, err.Error(), "mock error in PersistentPreRunE", "Error should match the mock error")

	// Also check if the subcommands are executed correctly
	for _, cmd := range rootCmd.Commands() {
		t.Run(fmt.Sprintf("subcommand-%s", cmd.Name()), func(t *testing.T) {
			// Check that each subcommand can be executed (no errors)
			err := cmd.ExecuteContext(context.Background())
			require.NoError(t, err, "Subcommand should execute without errors")
		})
	}
}

func TestInitCometBFTConfig(t *testing.T) {
	config := initCometBFTConfig()
	defaultConfig := cmbtcfg.DefaultConfig()
	require.Equal(t, config, defaultConfig)
}

func TestInitAppConfig(t *testing.T) {
	defaultConfig, _ := initAppConfig()

	require.Equal(t, serverconfig.DefaultConfigTemplate, defaultConfig)
	// add test for min gas price
}

func TestAppExport(t *testing.T) {
	exportedApp, err := appExport(log.NewNopLogger(), dbm.NewMemDB(), nil, 0, true, nil, simtestutil.NewAppOptionsWithFlagHome(app.DefaultNodeHome), nil)

	require.Error(t, err)
	require.NotNil(t, exportedApp)
}

type mockAppOptions struct {
	options map[string]interface{}
}

func (m mockAppOptions) Get(key string) interface{} {
	if val, ok := m.options[key]; ok {
		return val
	}
	return nil
}

func setupGenesisFile(t *testing.T) string {
	t.Helper()

	tmpDir := t.TempDir() // return a new temp dir
	configDir := filepath.Join(tmpDir, "config")
	err := os.Mkdir(configDir, 0755) // create a new dir
	require.NoError(t, err)

	genesisPath := filepath.Join(configDir, "genesis.json")
	err = os.WriteFile(genesisPath, []byte(`{"chain_id":"test-chain"}`), 0644) // read minimum genesis file
	require.NoError(t, err)

	return tmpDir
}

func TestNewApp(t *testing.T) {
	logger := log.Logger(log.NewNopLogger())
	db := dbm.NewMemDB()
	traceStore := new(bytes.Buffer)

	tmpHome := setupGenesisFile(t)

	appOpts := mockAppOptions{
		options: map[string]interface{}{
			"home":                     tmpHome,
			server.FlagPruning:         "nothing",    // or "default" / "everything" / "nothing"
			server.FlagMinGasPrices:    "0.001uatom", // minimum gas fees
			server.FlagHaltHeight:      uint64(0),    // no automatic halt
			server.FlagHaltTime:        uint64(0),
			server.FlagInterBlockCache: true,
			server.FlagIndexEvents:     []string{"tx.height", "tx.hash"},
			server.FlagIAVLCacheSize:   781250, // size of the IAVL cache
		},
	}

	appInstance := newApp(logger, db, traceStore, appOpts)
	require.NotNil(t, appInstance, "Should not be nil")
}
