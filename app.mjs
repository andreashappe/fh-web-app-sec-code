/* import needed parts */
import express from 'express';
import bodyParser from 'body-parser';
import ejsLayout from 'express-ejs-layouts';
import helmet from 'helmet';
import session from 'express-session';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import expressWinston from 'express-winston';

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

/* setup logging */
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }));

/* authentication middleware */
app.use(authenticateUser);

/* setup request handler */
app.get("/", async function (req, res) {
    res.render("index");
});

app.use("/todos", setup_todo_routes(express.Router()));
app.use("/session", setup_session_routes(express.Router()));

app.use("/session", rateLimit({
    max: 100,
    windowMs: 1*60*1000
}));

app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));

/* start-up the server */
const server = app.listen(process.env.NODE_PORT, function() {
	console.log("Server started! (Express.js)");
});