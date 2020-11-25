export class UserService {
    constructor(db) {
        this.db = db;
        Object.freeze(this);
    }

    async addUser(username, password) {
        return this.db.addUser(username, password);
    }

    async loginUser(username, password) {
        return this.db.loginUser(username, password);
    }
}

export class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        Object.freeze(this);
    }
}