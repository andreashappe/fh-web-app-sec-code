import { TodoService, Todo } from './../services/todo_service.mjs';
import assert from 'assert';

describe("My TodoService", () => {
    it("should be able to add todos", () => {
        const todos = new TodoService();
        const text = "new todo";

        let countBefore = todos.getTodoCount();
        let newTodo = todos.addTodo(text);
        let countAfter = todos.getTodoCount();

        assert.strictEqual(countAfter, countBefore+1);
        // [ [1, "new todo"] ]
        assert.deepStrictEqual(todos.getAllTodos(), [new Todo(newTodo.id, text)]);
        assert.deepStrictEqual(todos.getTodo(newTodo.id), new Todo(newTodo.id, text));
    });

    it("should be able to delete todos", () => {
        const todos = new TodoService();
        const text = "new todo";
        let newTodo = todos.addTodo(text);

        let countBefore = todos.getTodoCount();
        let result = todos.deleteTodo(newTodo.id);
        let countAfter = todos.getTodoCount();

        assert.strictEqual(countAfter, countBefore-1);
        assert.deepStrictEqual(todos.getAllTodos(), []);
        assert.strictEqual(result, true);
    });
});