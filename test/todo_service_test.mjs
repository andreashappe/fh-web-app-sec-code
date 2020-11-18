import { TodoService, Todo } from './../services/todo_service.mjs';
import {TodoSqliteStorage} from './../models/todo_sqlite_storage.mjs';

import assert from 'assert';

describe("My TodoService", async () => {
    it("should be able to add todos", async () => {
        const storage = await TodoSqliteStorage.build();
        const todos = new TodoService(storage);
        const text = "new todo";

        let countBefore = await todos.getTodoCount();
        let newTodo = await todos.addTodo(text);
        let countAfter = await todos.getTodoCount();

        assert.strictEqual(countAfter, countBefore+1);
        // [ [1, "new todo"] ]
        assert.deepStrictEqual(await todos.getAllTodos(), [new Todo(newTodo.id, text)]);
        assert.deepStrictEqual(await todos.getTodo(newTodo.id), new Todo(newTodo.id, text));
    });

    it("should be able to delete todos", async () => {
        const storage = await TodoSqliteStorage.build();
        const todos = new TodoService(storage);
        
        const text = "new todo";
        let newTodo = await todos.addTodo(text);

        let countBefore = await todos.getTodoCount();
        let result = await todos.deleteTodo(newTodo.id);
        let countAfter = await todos.getTodoCount();

        assert.strictEqual(countAfter, countBefore-1);
        assert.deepStrictEqual(await todos.getAllTodos(), []);
        assert.strictEqual(result, true);
    });
});