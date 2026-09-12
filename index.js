const form = document.querySelector("#task-form");
const taskArray = [];


form.addEventListener("submit", (foo) => {
    foo.preventDefault();
    const newForm = new FormData(form);
    
    const name = newForm.get("task-name");
    const description = newForm.get("desc");
    const priority = newForm.get("priority");
    const load = {
        name: name,
        description: description,
        priority: priority
    }
    console.log(load)
    taskArray.push(load)
});

console.log(taskArray)