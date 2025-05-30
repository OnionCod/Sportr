import { DuckDBConnection, DuckDBValue } from "@duckdb/node-api";
import { Nullable } from "tough-cookie";
export interface NewUser {
    privateName: string;
    privateEmail: string;
    privateAge: number;
    password: string;
    profileName: string;
    hubMemberships: string[];
}
export interface UserRecord {
    id: number;
    privateName: string;
    privateEmail: string;
    privateAge: number;
    profileName: string;
    hubMemberships: string[];
}
export declare class Users {
    private salt;
    constructor(salt: string);
    init(connection: DuckDBConnection): Promise<void>;
    loadUsersFromCsv(connection: DuckDBConnection, csvPath: string): Promise<void>;
    listUsers(connection: DuckDBConnection): Promise<UserRecord[]>;
    userWithEmail(connection: DuckDBConnection, email: string): Promise<Nullable<UserRecord>>;
    userWithCredentials(connection: DuckDBConnection, email: string, password: string): Promise<Nullable<UserRecord>>;
    newUser(db: DuckDBConnection, user: NewUser): Promise<UserRecord>;
    updatePassword(db: DuckDBConnection, userId: number, newPassword: string): Promise<void>;
}
export declare function rowToClass<T>(row: DuckDBValue[], ...attributes: string[]): T;
