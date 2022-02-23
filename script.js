if ('serviceWorker' in navigator) { // checking if the browser supports service workers
    window.addEventListener('load', function () { // when app loads, fire callback
        navigator.serviceWorker.register('/sw.js').then(function () { // register sw
            console.log('ServiceWorker registration successful');  // registration was successful
        }, function (err) {
            console.log('ServiceWorker registration failed', err); // registration failed
        });
    });
}

async function main() {
    const form = document.querySelector('form');
    const name_input = document.querySelector("[name='tname']");
    const duedate_input = document.querySelector("[name='duedate']");
    const assignedto_input = document.querySelector("[name='assignedto']");
    const tasksList = document.getElementById('students');

    // const existingStudents = JSON.parse(localStorage.getItem('students')) || [];
    const existingTasks = await getAllTasksFromDB()

    console.log(existingTasks)

    const studentData = [];

    existingTasks.forEach(student => {
        addTask(student.taskName,student.dueDate,student.assignedTo);
    });


    function addTask(task_name,due_date,assigned_to) {
        const div = document.createElement('div')
        div.classList.add('student')
        const h1 = document.createElement('h1')
        h1.innerHTML = task_name;
        const h2= document.createElement('h2')
        h2.innerHTML = due_date;
        const p = document.createElement('p')
        p.innerHTML = assigned_to;

        studentData.push({task_name,due_date,assigned_to });

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(p)
        tasksList.appendChild(div)

        //localStorage.setItem('students', JSON.stringify(studentData));
        addTaskToDB(task_name,due_date,assigned_to)
        name_input.value = ''
        duedate_input.value = ''
        assignedto_input.value = ''
    }

    // Events
    form.onsubmit = (event) => {
        event.preventDefault();
        addTask(name_input.value, duedate_input.value,assignedto_input.value);
    }
}

main()