import { Todo } from './../services/todo_service.mjs';

export class TodoSqliteStorage {

    static getDatabaseCreateStatement() {
        return "CREATE TABLE todos (todo TEXT, user_id INTEGER)";
    }

    constructor(db) {
        this.db = db;
        Object.freeze(this);
    }

    async addTodo(user_id, text) {
        const stmt = "insert into todos (user_id, todo) values (?, ?)";
        const result = await this.db.prepare(stmt, [user_id, text])
                                    .then(stmt => stmt.run());

        //retrieve id
        const id = result.lastID;
        return new Todo(id, text);
    }

    async getAllTodos(user_id) {
        const stmt = "select rowid, todo from todos where user_id  = ?";
        let results = [];
        await this.db.each(stmt, [user_id], (err, row) => {
            results.push(new Todo(row.rowid, row.user_id, row.todo));
        });
        return results;
    }

    async getTodo(user_id, id) {
        const stmt = "select rowid, user_id, todo from todos where rowid = ? and user_id = ? limit 1";
        let result = null;
        await this.db.each(stmt, [id, user_id], (err, row) => {
            result = new Todo(row.rowid, row.user_id, row.todo);
        });
        return result;
    }

    async deleteTodo(user_id, id) {
        const stmt = "delete from todos where rowid =? and user_id=?";
        await this.db.prepare(stmt, [id, user_id]).then(i => i.run());
        return true;
    }

    async getTodoCount(user_id) {
        return (await this.getAllTodos(user_id)).length;
    }
}
