export class UserService {
    constructor() {
        this.db = new Map();
        Object.freeze(this);
    }

    addUser(username, password) {
        if (this.db.has(username)) {
            return null;
        } else {
            const theUser = new User(username, password);
            this.db.set(username, theUser);
            return theUser;
        }
    }

    loginUser(username, password) {
        if (this.db.has(username)) {
            const theUser = this.db.get(username);
            if (theUser.password === password) {
                return theUser;
            }
        }
        return null;
    }
}

export class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        Object.freeze(this);
    }
}