/* import needed parts */
import express from 'express';
import bodyParser from 'body-parser';
import ejsLayout from 'express-ejs-layouts';
import helmet from 'helmet';

const app = express();

import {TodoService} from './services/todo_service.mjs';
import {setup_todo_routes} from './controllers/todo_controller.mjs';

export const todos = new TodoService();
todos.addTodo("first todos");
todos.addTodo("second todos");

/* setup application / application config */
app.set("view engine", "ejs");
app.set("layout", "layouts/default");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayout);
app.use(helmet());

/* setup request handler */
app.get("/", function (req, res) {
    res.send("Hello World from Express.js!");
});

app.use("/todos", setup_todo_routes(express.Router()));

/* start-up the server on port 3000 */
const server = app.listen(3000, function() {
	console.log("Server started! (Express.js)");
});