import bcrypt from 'bcrypt';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console()
    ],
  });

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
            logger.info("user logged in", {
                "user_id" : theUser.id,
                "username": username
            });
            return theUser;
        } else {
            logger.warn("user failed to login", {
                "username": username
            });
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