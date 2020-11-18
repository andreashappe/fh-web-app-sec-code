/* import needed parts */
import express from 'express';
const app = express();

/* setup request handler */
app.get('/', function(req, res) {
	res.send("Hello World from Express.js!");
});

/* temp */
app.get('/fubar', (req, res) => {
	res.send("fubar to the max!");
});

/* start-up the server on port 3000 */
const server = app.listen(3000, function() {
	console.log("Server started! (Express.js)");
});
