import {todos} from './../app.mjs';

export function setup_todo_routes(router) {

    /* add todo application here */
    // LIST: GET /todos
    router.get("/", (req, res) => {
        res.render('todos/index', { "todos" : todos.getAllTodos() })
    });

    // CREATE: POST /todos
    // TODO: test
    router.post("/", (req, res) => {
        const text = req.body.newTodo;

        const id = todos.addTodo(text);
        res.redirect("/todos");
    });

    // READ: GET /todos/<id>
    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        const todo = todos.getTodo(id);

        res.render("todos/show", { "todo" : todo });
    });

    // DELETE: DELETE /todos/<id>
    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        const todo = todos.deleteTodo(id);
        
        res.send("todo deleted");
    });

    router.post("/:id/delete", (req, res) => {
        const id = parseInt(req.params.id);

        const todo = todos.deleteTodo(id);
        res.redirect("/todos");        
    });

    return router;
}
