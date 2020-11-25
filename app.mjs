/* import needed parts */
import express from 'express';
import bodyParser from 'body-parser';
import ejsLayout from 'express-ejs-layouts';
import helmet from 'helmet';
import session from 'express-session';
import dotenv from 'dotenv';

import { TodoService } from './services/todo_service.mjs';
import { UserService } from './services/user_service.mjs';
import { setup_todo_routes } from './controllers/todo_controller.mjs';
import { authenticateUser, setup_session_routes } from './controllers/session_controller.mjs';
import { DatabaseManager } from './models/database_manager.mjs';

const app = express();
dotenv.config();

const database = await DatabaseManager.build();

export const todos = new TodoService(database.getTodoStorage());
export const users = new UserService(database.getUserStorage());

// add some debug data
const andy = await users.addUser("andy", "trustno1");
const admin = await users.addUser("admin", "toomanysecrets");

await todos.addTodo(andy, "first todo");
await todos.addTodo(andy, "second todo");
await todos.addTodo(admin, "smash the state");

/* setup application / application config */
app.set("view engine", "ejs");
app.set("layout", "layouts/default");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayout);
app.use(helmet());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    name: "session",
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: false
    }
}));

/* authentication middleware */
app.use(authenticateUser);

/* setup request handler */
app.get("/", async function (req, res) {
    res.render("index");
});

app.use("/todos", setup_todo_routes(express.Router()));
app.use("/session", setup_session_routes(express.Router()));

/* start-up the server */
const server = app.listen(process.env.NODE_PORT, function() {
	console.log("Server started! (Express.js)");
});