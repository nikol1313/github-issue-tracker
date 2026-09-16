const form = document.querySelector("#task-form");
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
// empty to store
const display = document.querySelector("#display");
const search = document.querySelector("#search-input");
// empty for result
const searched = document.querySelector("#searched");

// after every refresh picks hishest id and adds one to prevent dup.
let nextId = taskArray.length
    ? Math.max(...taskArray.map(task => task.id)) + 1
    : 1;

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
    localStorage.setItem("tasks", JSON.stringify(taskArray));
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


// delete task
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
            localStorage.setItem("tasks", JSON.stringify(taskArray));
        }

        renderTasks();
    }
});

//search/filter

search.addEventListener("input", (foo) => {
    const searchedT = foo.target.value.trim().toLowerCase();

    // Clear old search results
    searched.innerHTML = "";
    if (!searchedT) return;

    for (const task of taskArray) {

        if (task.name.toLowerCase().includes(searchedT)) {

            const result = document.createElement("div");
            result.classList.add("task");

            result.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p>Priority: ${task.priority}</p>
            `;

            searched.append(result);
        };
    };
});

renderTasks();
