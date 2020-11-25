import bcrypt from 'bcrypt';

export class UserService {
    constructor(db) {
        this.db = db;
        Object.freeze(this);
    }

    async addUser(username, password) {

        const hashed = await bcrypt.hash(password, 10);
        return this.db.addUser(username, hashed);
    }

    async loginUser(username, password) {
        const theUser = await this.db.getUserByUsername(username);

        const hashIsTheSame = await bcrypt.compare(password, theUser.password);
        
        if (hashIsTheSame) {
            return theUser;
        } else {
            return null;
        }
    }

    async getUser(id) {
        return this.db.getUserById(id);
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