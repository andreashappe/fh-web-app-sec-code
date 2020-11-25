import {todos} from './../app.mjs';
import {generateJWT} from './../services/jwt_service.mjs';

// the C in MVC
export function setup_todo_routes(router) {

    // LIST: GET /todos
    router.get("/", async (req, res) => {
        const tmp = await todos.getAllTodos(req.current_user)

        res.render('todos/index', { "todos" : tmp,
                                    "user": req.current_user,
                                    "token": generateJWT(req.current_user)
                                  })
    });

    // CREATE: POST /todos
    router.post("/", async (req, res) => {
        const text = req.body.newTodo;

        const id = await todos.addTodo(req.current_user, text);

        res.redirect("/todos");
    });

    // READ: GET /todos/<id>
    router.get("/:id", async (req, res) => {
        const id = parseInt(req.params.id);

        const todo = await todos.getTodo(req.current_user, id);

        res.render("todos/show", { "todo" : todo });
    });

    // DELETE: DELETE /todos/<id>
    router.delete("/:id", async (req, res) => {
        const id = parseInt(req.params.id);

        const todo = await todos.deleteTodo(req.current_user, id);
        
        res.send("todo deleted");
    });

    router.post("/:id/delete", async (req, res) => {
        const id = parseInt(req.params.id);

        const todo = await todos.deleteTodo(req.current_user, id);
        
        res.redirect("/todos");        
    });

    return router;
}
