import { DuckDBInstance, DuckDBConnection } from '@duckdb/node-api';
export declare class Database {
    connectionString: string;
    private _database;
    private connections;
    private connectionCounter;
    constructor(connectTo: string);
    private deferredInit;
    database(): Promise<DuckDBInstance>;
    connection(closure: (con: DuckDBConnection) => Promise<void>): Promise<void>;
    run<T>(dbFunc: (connection: DuckDBConnection) => Promise<T>): Promise<T>;
}
