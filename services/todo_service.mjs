export class TodoService {
    constructor() {
        this.data = new Map();
        Object.seal(this);
    }

    addTodo(text) {
        const id = get_next_id(this.data);
        this.data.set(id, text);
        return id
    }

    getAllTodos() {
        return Array.from(this.data)
    }

    getTodo(id) {
        return this.data.get(id);
    }

    deleteTodo(id) {
        return this.data.delete(id);
    }

    getTodoCount() {
        return this.data.size;
    }
}

function get_next_id(collection) {
	let max = 0;
	for(let i of collection.keys()) {
		if (i> max) {
			max = i;
		}
	}
	return max + 1;
}