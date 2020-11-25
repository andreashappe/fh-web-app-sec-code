import {User} from './../services/user_service.mjs';

export class UserSqliteStorage {

    static getDatabaseCreateStatement() {
        return "CREATE TABLE users (username TEXT, password TEXT)";
    }

    constructor(db) {
        this.db = db;
        Object.freeze(this);
    }

    async addUser(username, password) {
        const stmt = "insert into users (username, password) values (?, ?)";
        const result = await this.db.prepare(stmt, [username, password])
                                    .then(stmt => stmt.run());

        //retrieve id
        const id = result.lastID;
        return new User(id, username, password);
    }

    async loginUser(username, password) {
        const stmt = "select rowid, username, password from users where username = ? and password = ? limit 1";
        let result = null;
        await this.db.each(stmt, [username, password], (err, row) => {
            result = new User(row.rowid, row.username, row.password);
        });
        return result;
    }

    async getUserByUsername(username) {
        const stmt = "select rowid, username, password from users where username = ? limit 1";
        let result = null;
        await this.db.each(stmt, [username], (err, row) => {
            result = new User(row.rowid, row.username, row.password);
        });
        return result;
    }


    async getUserById(id) {
        const stmt = "select rowid, username, password from users where rowid = ? limit 1";
        let result = null;
        await this.db.each(stmt, [id], (err, row) => {
            result = new User(row.rowid, row.username, row.password);
        });
        return result;
    }

}