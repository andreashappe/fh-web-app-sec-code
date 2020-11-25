import Database from 'sqlite-async';

import { TodoSqliteStorage } from "./todo_sqlite_storage.mjs";
import { UserSqliteStorage } from "./user_sqlite_storage.mjs";

// TODO: collection für storages
export class DatabaseManager {
    static async build() {
        const db = await Database.open(":memory:");
        await db.run(TodoSqliteStorage.getDatabaseCreateStatement());
        await db.run(UserSqliteStorage.getDatabaseCreateStatement());
        return new DatabaseManager(db);
    }

    constructor(db) {
        this.db = db;
        this.userStorage = new UserSqliteStorage(db);
        this.todoStorage = new TodoSqliteStorage(db);
        Object.freeze(this);
    }

    getUserStorage() {
        return this.userStorage;
    }

    getTodoStorage() {
        return this.todoStorage;
    }
}