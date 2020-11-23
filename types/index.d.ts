import { AlgorandTxn, Address } from "./transaction";

type TxHash = string;

interface SignedTx {
	// Transaction hash
	txID: TxHash;
	// Signed transaction
	blob: Uint8Array;
}

interface Accounts {
	address: Address;
}

interface Options {
	timeout: number;
}

declare abstract class MyAlgo {
	abstract connect(): Promise<Accounts[]> | Promise<StoredAccount[]>;
	abstract signTransaction(transaction: AlgorandTxn | AlgorandTxn[], timeout?: number): Promise<SignedTx | SignedTx[]>;
}

export class MyAlgoWallet extends MyAlgo {

	/**
	 * @param frameUrl Override wallet.myalgo.com default frame url.
	 */
	constructor(frameUrl?: string);

	/**
	 * @async
	 * @description Receives user's accounts from MyAlgo.
	 * @param options Operation options
	 * @returns Returns an array of Algorand addresses.
	 */
	connect(options?: Options): Promise<Accounts[]>;

	/**
	 * @async
	 * @description Sign an Algorand Transaction.
	 * @param transaction Expect a valid Algorand transaction or transaction array.
	 * @param options Operation options
	 * @returns Returns signed transaction or an array of signed transactions.
	 */
	signTransaction(transaction: AlgorandTxn | AlgorandTxn[], options?: Options): Promise<SignedTx | SignedTx[]>;
}

type EventNames = "ACCOUNTS_UPDATE" | "SETTINGS_UPDATE" | "ON_LOCK_WALLET";
type onUpdate = (update: any) => void|Promise<void>;

interface StoredAccount {
	address: Address;
	id: string;
	name: string;
	type: string;
}

export class MyAlgoWalletWithIframe extends MyAlgo {
	constructor(frameUrl?: string);
	connect(options?: Options): Promise<StoredAccount[]>;
	signTransaction(transaction: AlgorandTxn | AlgorandTxn[], options?: Options): Promise<SignedTx | SignedTx[]>;
	onLoad(): Promise<void>;
	isLocked(): Promise<boolean>;
	lock(): Promise<void>;
	on(eventName: EventNames, callback: onUpdate): void;
	off(eventName: EventNames, callback: onUpdate): void;
	getAccounts(): Promise<StoredAccount[]>;
	getSettings(): Promise<any>;
}
