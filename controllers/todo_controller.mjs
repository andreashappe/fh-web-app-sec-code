import { users } from '../app.mjs';
import {todos} from './../app.mjs';

// the C in MVC
export function setup_todo_routes(router) {

    // LIST: GET /todos
    router.get("/", async (req, res) => {
        const tmp = await todos.getAllTodos()

        res.render('todos/index', { "todos" : tmp,
                                    "user": req.current_user
                                  })
    });

    // CREATE: POST /todos
    router.post("/", async (req, res) => {
        const text = req.body.newTodo;

        const id = await todos.addTodo(text);

        res.redirect("/todos");
    });

    // READ: GET /todos/<id>
    router.get("/:id", async (req, res) => {
        const id = parseInt(req.params.id);

        const todo = await todos.getTodo(id);

        res.render("todos/show", { "todo" : todo });
    });

    // DELETE: DELETE /todos/<id>
    router.delete("/:id", async (req, res) => {
        const id = parseInt(req.params.id);

        const todo = await todos.deleteTodo(id);
        
        res.send("todo deleted");
    });

    router.post("/:id/delete", async (req, res) => {
        const id = parseInt(req.params.id);

        const todo = await todos.deleteTodo(id);
        
        res.redirect("/todos");        
    });

    return router;
}
