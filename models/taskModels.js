let tasks = [
    {
        title : "Ma tâche 1",
        completed : true,
        id : 1
    },
    {
        title : "Ma tâche 2",
        completed : false,
        id : 2
    },
    {
        title : "Ma tâche 3",
        completed : true,
        id : 3
    },
];
let nextId = 4;

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
function update(id, taskUpdated){
    const task = getById(id);
    if (!task) {
        return null
    }

    if (taskUpdated.title !== undefined) {
        task.title = String(taskUpdated.title).trim();
    }
    if (taskUpdated.completed !== undefined){
        task.completed = taskUpdated.completed;
    }

    return task;
}

// Delete
function deleteTask(id){
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1){
        return null
    }

    const deleteTask = tasks[index];
    tasks.splice(index, 1);
    return deleteTask;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteTask
};
