/* import needed parts */
import express from 'express';
const app = express();

import {TodoService} from './services/todo_service.mjs';

const todos = new TodoService();
todos.addTodo("first todos");
todos.addTodo("second todos");

/* setup request handler */
app.get('/', function(req, res) {
	res.send("Hello World from Express.js!");
});

/* add todo application here */
// LIST: GET /todos
app.get("/todos", (req, res) => {
	res.send(JSON.stringify(todos.getAllTodos()));
});

// CREATE: POST /todos
// TODO: test
app.post("/todos", (req, res) => {
	const text = req.body.todos;

	const id = todos.addTodo(text);

	res.send("todo added: " + id);
});

// READ: GET /todos/<id>
app.get("/todos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	const todo = todos.getTodo(id);

	res.send("the todo: " + todo);
});

// DELETE: DELETE /todos/<id> 
app.delete("/todos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	const todo = todos.deleteTodo(id);
	
	res.send("todo deleted");
});

/* start-up the server on port 3000 */
const server = app.listen(3000, function() {
	console.log("Server started! (Express.js)");
});
