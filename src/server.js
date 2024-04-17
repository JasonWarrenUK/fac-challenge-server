const express = require("express");
const server = express();
module.exports = server;

const staticHandler = express.static("public");
const bodyParser = express.urlencoded();
server.use(staticHandler);
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
	next();
};
server.use(logger);

server.get("/", (req, res) => {
	res.send(`<!doctype html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>FAC Challenge: Servers</title>
        <link rel="stylesheet" href="/style.css">
			</head>
			<body>
				<h1>Hello Express</h1>
			</body>
		</html>
	`)
});

server.get("/colour", (req, res) => {
	const hex = req.query.hex || `ffffff`;
  res.send(`
		<style>
			body {
				background-color: #${hex};
			}
		</style>

		<form>
			<h2>Background Changer</h2>
			<p>Enter 6 Characters</p>
			<pre>Acceptable Characters: 0-9 & a-f</pre>
			<label for="hex">Hex Code</label>
			<input name="hex" value="${hex}"></input>
			<p>Then hit the return key</p>
		</form>
	`);
});

/* CHEESE */

let cheeses = [];

server.get("/cheese", (req, res) => {
	const form = `<form action="/cheese" method="POST">
		<h2>Cheese? Cheese.</h2>
		
		<div>
			<label for="cheeseName">Name</label>
			<input name="name" value="name"></input>
		</div>

		<div>
			<label for="cheeseScore">Score</label>
			<input type="range" name="rating" value="cheeseScore" min="0" max="5"/>
		</div>

		<button>Cheese</button>
	</form>`;

	const table = `<table>
		<tr>
			<th>Cheese</th> <th>Score</th>
		</tr>
		${cheeses.map((cheese) => `<tr>
			<td>${cheese.name}</td> <td>${cheese.score}</td>
		</tr>`)}
	</table>`

	const listItems = cheeses.map((cheese) => `
		<li>${cheese.name} | ${cheese.score}</li>
	`);

	const list = `<ul>${listItems.join("")}</ul>`;

	res.send(`${form} ${list} ${table}`);
});

server.post("/cheese", bodyParser, (req, res) => {
	cheeses.push({
		name: req.body.name,
		score: req.body.rating,
	});

	res.redirect(`/cheese`);
});