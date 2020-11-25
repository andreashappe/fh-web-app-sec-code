import { users } from "./../app.mjs";

export function setup_session_routes(router) {
  router.post("/", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const theUser = await users.loginUser(username, password);

    if (theUser) {
      req.session.regenerate(function (error) {
        req.session.user_id = theUser.id;
        res.redirect("/todos");
      });
    } else {
      res.render("index");
    }
  });

  router.post("/logout", async function (req, res) {
    req.session.destroy(function (error) {
      res.redirect("/");
    });
  });

  return router;
}

export async function authenticateUser(req, res, next) {
    if (req.url === "/" ||
        (req.url === "/session" && req.method === "POST")) {
        next();
    } else {
        if (req.session.user_id) {
            req.current_user = await users.getUser(req.session.user_id);
            next();
        } else {
            res.redirect("/");
        }
    }
}