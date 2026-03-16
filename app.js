const http = require("http");
const routes = require("./routes/routes");

const server = http.createServer((req, res)=> {
	routes(req, res);
});

server.listen(3001, () => {
	console.log(`Serveur lancé sur http://localhost:3001/tasks`);
})