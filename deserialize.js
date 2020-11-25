/* import needed parts */
const express = require('express');
const bodyParser = require('body-parser');
const serialize = require('node-serialize');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/deserialize", function(req, res) {
	var str = ""+req.body.fubar;
	  const todo = serialize.unserialize(str);
	  console.log(todo);
	  res.send("wohoo!");
});

const server = app.listen(3000, function() {
	console.log("Server started! (Express.js)");

	const normal = {
		"todo" : function () {
			require('child_process').exec("ls /bin", function (err, stdout, stdin) {
				console.log(stdout);
			});
		}
	}

	console.log("serialized normal object: " + serialize.serialize(normal)); 
});
