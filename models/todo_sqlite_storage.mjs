import { Todo } from './../services/todo_service.mjs';

export class TodoSqliteStorage {

    static getDatabaseCreateStatement() {
        return "CREATE TABLE todos (todo TEXT)";
    }

    constructor(db) {
        this.db = db;
        Object.freeze(this);
    }

    async addTodo(text) {
        const stmt = "insert into todos (todo) values (?)";
        const result = await this.db.prepare(stmt, [text])
                                    .then(stmt => stmt.run());

        //retrieve id
        const id = result.lastID;
        return new Todo(id, text);
    }

    async getAllTodos() {
        const stmt = "select rowid, todo from todos";
        let results = [];
        await this.db.each(stmt, [], (err, row) => {
            results.push(new Todo(row.rowid, row.todo));
        });
        return results;
    }

    async getTodo(id) {
        const stmt = "select rowid, todo from todos where rowid = ? limit 1";
        let result = null;
        await this.db.each(stmt, [id], (err, row) => {
            result = new Todo(row.rowid, row.todo);
        });
        return result;
    }

    async deleteTodo(id) {
        const stmt = "delete from todos where rowid =?";
        await this.db.prepare(stmt, [id]).then(i => i.run());
        return true;
    }

    async getTodoCount() {
        return (await this.getAllTodos()).length;
    }
}
