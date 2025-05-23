/* tslint:disable */
/* eslint-disable */
export function create_keypair(): KeyPair;
export function key_to_did(pubkey: string): Did;
export function did_to_key(did: Did): string;
export function encrypt(data: string, pubkey: string): EncryptedData;
export function decrypt(data: EncryptedData, privkey: string): string;
export function sign(data: string, privkey: string): string;
export function verify(data: string, sig: string, pubkey: string): boolean;
export function sha256(data: string): string;
export function ecdh(privkey: string, pubkey: string): string;
/**
 * Handler for `console.log` invocations.
 *
 * If a test is currently running it takes the `args` array and stringifies
 * it and appends it to the current output of the test. Otherwise it passes
 * the arguments to the original `console.log` function, psased as
 * `original`.
 */
export function __wbgtest_console_log(args: Array<any>): void;
/**
 * Handler for `console.debug` invocations. See above.
 */
export function __wbgtest_console_debug(args: Array<any>): void;
/**
 * Handler for `console.info` invocations. See above.
 */
export function __wbgtest_console_info(args: Array<any>): void;
/**
 * Handler for `console.warn` invocations. See above.
 */
export function __wbgtest_console_warn(args: Array<any>): void;
/**
 * Handler for `console.error` invocations. See above.
 */
export function __wbgtest_console_error(args: Array<any>): void;
export function __wbgtest_cov_dump(): Uint8Array | undefined;
export class Did {
  free(): void;
  constructor(id: string);
  id: string;
}
export class EncryptedData {
  free(): void;
  constructor(pubkey_from: string, pubkey_to: string, data: string, nonce: string);
  readonly pubkey_from: string;
  readonly pubkey_to: string;
  readonly data: string;
  readonly nonce: string;
}
export class KeyPair {
  free(): void;
  constructor(pubkey: string, privkey: string);
  pubkey: string;
  privkey: string;
}
export class Tx {
  free(): void;
  constructor(coin: string, from: string, to: string, amount: string, fee: string, data: string);
  coin: string;
  from: string;
  to: string;
  amount: string;
  fee: string;
  data: string;
}
/**
 * Runtime test harness support instantiated in JS.
 *
 * The node.js entry script instantiates a `Context` here which is used to
 * drive test execution.
 */
export class WasmBindgenTestContext {
  free(): void;
  /**
   * Creates a new context ready to run tests.
   *
   * A `Context` is the main structure through which test execution is
   * coordinated, and this will collect output and results for all executed
   * tests.
   */
  constructor();
  /**
   * Handle `--include-ignored` flag.
   */
  include_ignored(include_ignored: boolean): void;
  /**
   * Handle filter argument.
   */
  filtered_count(filtered: number): void;
  /**
   * Executes a list of tests, returning a promise representing their
   * eventual completion.
   *
   * This is the main entry point for executing tests. All the tests passed
   * in are the JS `Function` object that was plucked off the
   * `WebAssembly.Instance` exports list.
   *
   * The promise returned resolves to either `true` if all tests passed or
   * `false` if at least one test failed.
   */
  run(tests: any[]): Promise<any>;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_keypair_free: (a: number, b: number) => void;
  readonly keypair_new: (a: number, b: number, c: number, d: number) => number;
  readonly keypair_pubkey: (a: number) => [number, number];
  readonly keypair_privkey: (a: number) => [number, number];
  readonly keypair_set_pubkey: (a: number, b: number, c: number) => void;
  readonly keypair_set_privkey: (a: number, b: number, c: number) => void;
  readonly __wbg_did_free: (a: number, b: number) => void;
  readonly did_new: (a: number, b: number) => number;
  readonly did_id: (a: number) => [number, number];
  readonly did_set_id: (a: number, b: number, c: number) => void;
  readonly __wbg_encrypteddata_free: (a: number, b: number) => void;
  readonly encrypteddata_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly encrypteddata_pubkey_from: (a: number) => [number, number];
  readonly encrypteddata_pubkey_to: (a: number) => [number, number];
  readonly encrypteddata_data: (a: number) => [number, number];
  readonly encrypteddata_nonce: (a: number) => [number, number];
  readonly __wbg_tx_free: (a: number, b: number) => void;
  readonly tx_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
  readonly tx_coin: (a: number) => [number, number];
  readonly tx_from: (a: number) => [number, number];
  readonly tx_to: (a: number) => [number, number];
  readonly tx_amount: (a: number) => [number, number];
  readonly tx_fee: (a: number) => [number, number];
  readonly tx_data: (a: number) => [number, number];
  readonly tx_set_coin: (a: number, b: number, c: number) => void;
  readonly tx_set_from: (a: number, b: number, c: number) => void;
  readonly tx_set_to: (a: number, b: number, c: number) => void;
  readonly tx_set_amount: (a: number, b: number, c: number) => void;
  readonly tx_set_fee: (a: number, b: number, c: number) => void;
  readonly tx_set_data: (a: number, b: number, c: number) => void;
  readonly create_keypair: () => number;
  readonly key_to_did: (a: number, b: number) => number;
  readonly did_to_key: (a: number) => [number, number];
  readonly encrypt: (a: number, b: number, c: number, d: number) => number;
  readonly decrypt: (a: number, b: number, c: number) => [number, number];
  readonly sign: (a: number, b: number, c: number, d: number) => [number, number];
  readonly verify: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sha256: (a: number, b: number) => [number, number];
  readonly ecdh: (a: number, b: number, c: number, d: number) => [number, number];
  readonly __wbgt__core::tests::wasm::encrypt_decrypt: (a: number) => void;
  readonly __wbgt__core::tests::wasm::did_conversion: (a: number) => void;
  readonly __wbgt__core::tests::wasm::sign_verify: (a: number) => void;
  readonly __wbgt__core::tests::wasm::sha256_hash: (a: number) => void;
  readonly __wbgt__core::tests::wasm::ecdh_shared_secret: (a: number) => void;
  readonly rustsecp256k1_v0_10_0_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_10_0_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_10_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_10_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly __wbg_wasmbindgentestcontext_free: (a: number, b: number) => void;
  readonly wasmbindgentestcontext_new: () => number;
  readonly wasmbindgentestcontext_include_ignored: (a: number, b: number) => void;
  readonly wasmbindgentestcontext_filtered_count: (a: number, b: number) => void;
  readonly wasmbindgentestcontext_run: (a: number, b: number, c: number) => any;
  readonly __wbgtest_console_log: (a: any) => void;
  readonly __wbgtest_console_debug: (a: any) => void;
  readonly __wbgtest_console_info: (a: any) => void;
  readonly __wbgtest_console_warn: (a: any) => void;
  readonly __wbgtest_console_error: (a: any) => void;
  readonly __wbgtest_cov_dump: () => [number, number];
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly closure118_externref_shim: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures__invoke0_mut__h90d8afc0483c2769: (a: number, b: number) => void;
  readonly closure131_externref_shim: (a: number, b: number, c: any, d: number, e: any) => void;
  readonly closure135_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
