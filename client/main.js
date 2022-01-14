// Compliment Button 
document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/").then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

//   Fortune Button
  document.getElementById("fortuneButton").onclick = function () {
      axios.get("http://localhost:4000/api/fortune/").then(function(res){
          const data = res.data;
          alert(data)
      });
  };

//   Planner planning

console.log('what is planner form: ', plannerForm)

plannerForm.addEventListener('submit', (elem)=> {
    elem.preventDefault();
    console.log('what is elem]', elem)
    // console.log('what is elem]', elem)

    const newTask = {
        name: taskName?.value,
        priority: priority?.value
    };

    axios.post("http://localhost:4000/api/planner", newTask)
    .then((res)=>{
        displayTask(res.data);
    }),

    taskName.value = ""
    priority.selectedIndex= 0;
})

const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/api/planner/${id}`).then((res)=>{
        displayTask(res.data)
    })

}

const createTask = (task) => {
    const newTask = document.createElement("div")

    newTask.className = "new-task";

    newTask.innerHTML = `<h1>${task.name}</h1> <p>priority: ${task.priority}</p>
    <button class="delete-btn" value="${task.id}> delete </button>`

    planner.appendChild(newTask);

    let deleteBtn = document.getElementsByClassName("delete-btn");

    for (let i =0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", deleteTask)
    }
}

const displayTask = (arr) => {
     for (let i = 0; i < arr.length; i++)
     createTask(arr[i])
}