export class TodoService {
    constructor(data) {
        this.data = data;
        Object.seal(this);
    }

    addTodo(text) {
        return this.data.addTodo(text);
    }

    getAllTodos() {
        return this.data.getAllTodos();
    }

    getTodo(id) {
        return this.data.getTodo(id);
    }

    deleteTodo(id) {
        return this.data.deleteTodo(id);
    }

    getTodoCount() {
        return this.data.getTodoCount();
    }
}

export class Todo {
    constructor(id, text) {
        this.id = id;
        this.todo = text;
        Object.freeze(this);
    }
}