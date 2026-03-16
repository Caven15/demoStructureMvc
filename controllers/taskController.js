const taskModel = require("../models/taskModels");

function handleGetAll(req, res) {
    const allTasks = taskModel.getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allTasks));
}

function handleGetById(req, res, id) {
    const taskId = parseInt(id);
    const task = taskModel.getById(taskId);

    if (task) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(task));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Task not found" }));
    }
}

function handleCreate(req, res) {
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    req.on("end", () => {
        try {
            if (!body.trim()) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Request body is empty" }));
                return;
            }

            const newTask = JSON.parse(body);

            const taskToCreate = {
                title: newTask.title.trim(),
                completed: !!newTask.completed,
            };

            const created = taskModel.create(taskToCreate);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(created));
        } catch (err) {
            console.error("Error parsing JSON:", err.message);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid JSON format" }));
        }
    });

    req.on("error", (err) => {
        console.error("Request error:", err);
        if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Error processing request" }));
        }
    });
}

module.exports = {
    handleGetAll,
    handleGetById,
    handleCreate,
};
