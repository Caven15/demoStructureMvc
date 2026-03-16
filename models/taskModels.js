let tasks = [];
let nextId = 1;

// --- CRUD ---

// GetAll
function getAll() {
    return tasks;
}

// GetOne
function getById(id) {
    return tasks.find((task) => task.id === id);
}

// ADD
function create(newTask) {
    newTask.id = nextId++;
    tasks.push(newTask);
    return newTask;
}

// Update

// Delete

module.exports = {
    getAll,
    getById,
    create,
};
