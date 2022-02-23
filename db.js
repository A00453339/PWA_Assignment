var db = new Dexie("studentsDatabase");

// DB with single table "students" with primary key "id" and
// indexes on properties "name" and "city"
db.version(10).stores({
    students: `
    ++id,
    taskName,
    dueDate,
    assignedTo`,
});

function getAllTasksFromDB() {
    return db.students.toArray().then((data) => {
        return data
    })

}

function addTaskToDB(taskName,dueDate,assignedTo ) {
    db.students.put({taskName,dueDate,assignedTo })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

async function queryByName(name) {
    if (name === undefined) return 0
    return await db.students
        .filter((student) => {
            return student.name === name
        })
        .toArray()
}


// Ref -> https://dexie.org/docs/Tutorial/Hello-World