const { URL } = require("url"); 
const taskController = require("../controllers/taskController");

function Routes(req, res) {
    const urlObj = new URL(req.url, "http://localhost");

    const pathname = urlObj.pathname;
    const id = urlObj.searchParams.get("id"); 

    if (pathname === "/tasks" && req.method === "GET") {
        if (id) {
            taskController.handleGetById(req, res, id);
        } else {
            taskController.handleGetAll(req, res);
        }
    } else if (pathname === "/tasks" && req.method === "POST") {
        taskController.handleCreate(req, res);
    } else if (pathname === "/tasks" && req.method === "PUT"){
        taskController.handleUpdate(req, res, id);
    } else if (pathname === "/tasks" && req.method === "DELETE"){
        taskController.handleDelete(req, res, id);
    } else if (pathname === "/tasks" && req.method === "PATCH") {
        taskController.handleStatus(req, res, id);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Not Found");
    }
}

module.exports = Routes;
