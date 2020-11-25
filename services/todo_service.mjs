export class TodoService {
    constructor(data) {
        this.data = data;
        Object.seal(this);
    }

    addTodo(user, text) {
        return this.data.addTodo(user.id, text);
    }

    getAllTodos(user) {
        return this.data.getAllTodos(user.id);
    }

    getTodo(user, id) {
        return this.data.getTodo(user.id, id);
    }

    deleteTodo(user, id) {
        return this.data.deleteTodo(user.id, id);
    }

    getTodoCount(user) {
        return this.data.getTodoCount(user.id);
    }
}

export class Todo {
    constructor(id, user_id, text) {
        this.id = id;
        this.user_id = user_id;
        this.todo = text;
        Object.freeze(this);
    }
}