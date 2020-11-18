import { TodoService } from './../services/todo_service.mjs';
import assert from 'assert';

describe("My TodoService", () => {
    it("should be able to add todos", () => {
        const todos = new TodoService();
        const text = "new todo";

        let countBefore = todos.getTodoCount();
        let newId = todos.addTodo(text);
        let countAfter = todos.getTodoCount();

        assert.strictEqual(countAfter, countBefore+1);
        // [ [1, "new todo"] ]
        assert.deepStrictEqual(todos.getAllTodos(), [[newId, text]]);
        assert.deepStrictEqual(todos.getTodo(newId), text);
    });

    it("should be able to delete todos", () => {
        const todos = new TodoService();
        const text = "new todo";
        let newId = todos.addTodo(text);

        let countBefore = todos.getTodoCount();
        let result = todos.deleteTodo(newId);
        let countAfter = todos.getTodoCount();

        assert.strictEqual(countAfter, countBefore-1);
        assert.deepStrictEqual(todos.getAllTodos(), []);
        assert.strictEqual(result, true);
    });
});