import { DuckDBInstance } from '@duckdb/node-api';
// Class for abstracting the logic of connecting to a database
export class Database {
    connectionString;
    _database = null;
    connections = new Map();
    connectionCounter = 0;
    constructor(connectTo) {
        this.connectionString = connectTo;
        // Setup sigterm behavior
        process.on('SIGINT', async () => {
            console.log("Closing database...");
            await Promise.all(this.connections.values().map(c => c.closeSync()));
            process.exit();
        });
    }
    // Deferring the creation of the DB instance allows for easier testing, since the connection string can be overridden before a database instance exists
    async deferredInit() {
        this._database = await DuckDBInstance.create(this.connectionString);
        return this._database;
    }
    async database() {
        if (this._database === null) {
            return await this.deferredInit();
        }
        return this._database;
    }
    async connection(closure) {
        const connection = await this.database().then(db => db.connect());
        // Add to connections registry
        const connectionKey = ++this.connectionCounter;
        this.connections.set(connectionKey, connection);
        await closure(connection);
        await connection.closeSync();
        // remove from connections registry
        this.connections.delete(connectionKey);
    }
    // A convenance function for when you only need to run a query and return the result
    async run(dbFunc) {
        const connection = await this.database().then(db => db.connect());
        // Add to connections registry
        const connectionKey = ++this.connectionCounter;
        this.connections.set(connectionKey, connection);
        const result = await dbFunc(connection);
        await connection.closeSync();
        // remove from connections registry
        this.connections.delete(connectionKey);
        return result;
    }
}
//# sourceMappingURL=database.js.map