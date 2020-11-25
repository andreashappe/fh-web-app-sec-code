/* import needed parts */
import express from 'express';
import bodyParser from 'body-parser';
import ejsLayout from 'express-ejs-layouts';
import helmet from 'helmet';
import session from 'express-session';
import dotenv from 'dotenv';

import {TodoService} from './services/todo_service.mjs';
import { UserService } from './services/user_service.mjs';
import {TodoSqliteStorage} from './models/todo_sqlite_storage.mjs';
import {setup_todo_routes} from './controllers/todo_controller.mjs';

const app = express();
dotenv.config();

const storage = await TodoSqliteStorage.build();

export const todos = new TodoService(storage);
export const users = new UserService();

// add some debug data

const andy = await users.addUser("andy", "trustno1");
const admin = await users.addUser("admin", "toomanysecrets");

await todos.addTodo("first todos");
await todos.addTodo("second todos");

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
app.use(function (req, res, next) {
    if (req.url === "/" ||
        (req.url === "/session" && req.method === "POST")) {
        next();
    } else {
        if (req.session.user_id == null) {
            res.redirect("/");
        } else {
            next();
        }
    }
});

/* setup request handler */
app.get("/", async function (req, res) {
    res.render("index");
});

app.post("/session", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const theUser = await users.loginUser(username, password);

    if (theUser) {
        req.session.regenerate( function (error) {
            req.session.user_id = theUser.username;
            res.redirect("/todos");
        });
    } else {
        res.render("index");
    }
});

app.post("/session/logout", async function(req, res) {
    req.session.destroy( function (error) {
        res.redirect("/");    
    });
});

app.use("/todos", setup_todo_routes(express.Router()));

/* start-up the server */
const server = app.listen(process.env.NODE_PORT, function() {
	console.log("Server started! (Express.js)");
});