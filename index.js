const form = document.querySelector("#task-form");
const taskArray = [];
const display = document.querySelector("#display");

let nextId = 1;

form.addEventListener("submit", (foo) => {
    foo.preventDefault();

    const newForm = new FormData(form);

    const load = {
        id: nextId++,
        name: newForm.get("task-name"),
        description: newForm.get("desc"),
        priority: newForm.get("priority")
    };

    taskArray.push(load);

    renderTasks();
    form.reset();
});


function renderTasks() {
    display.innerHTML = "";

    taskArray.forEach(task => {
        display.innerHTML += `
            <div class="task" data-id="${task.id}">
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <span>${task.priority}</span>
                <button type="button" class="deleteB">Delete</button>
            </div>
        `;
    });
}


display.addEventListener("click", (foo) => {
    // we dont listen to buttonB directly cuz it doesnt exist at first
    if (foo.target.classList.contains("deleteB")) {
        const taskElement = foo.target.closest(".task");
        // get the id from data-id
        const id = Number(taskElement.dataset.id);

        const index = taskArray.findIndex(task => task.id === id);

        // findIndex return -1, so if not equal -1 we found the element.
        if (index !== -1) {
            taskArray.splice(index, 1);
        }

        renderTasks();
    }
});

//search/filter
