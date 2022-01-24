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


document.getElementById('plannerForm').addEventListener('submit', (elem)=> {
    elem.preventDefault();

    const newTask = document.getElementById('task-input').value
    const optionValue = document.querySelector('#select-task');

    const newAddedTaskObj = {
        name: newTask,
        priority: optionValue.value
    };

    // creating task
    axios.post("http://localhost:4000/api/planner", newAddedTaskObj)
    .then((res)=>{
        displayTask(res.data);
    })
}) // end of plannerForm func

const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/api/planner/${id}`).then((res)=>{
        displayTask(res.data)
    })

}

const editTask = (id) => {
    let editedTask = document.getElementById(`new-task-for-${id}`).value
    axios.put(`http://localhost:4000/api/planner/edit/${id}`, {name: editedTask}).then((res)=>{
       displayTask(res.data)
   })
}

const displayTask = (arr) => {
     const list = arr.map((task) => `
     <li>
     <p> Task: ${task.name} </p>
     <p> priority: ${task.priority}</p>
     <input id='new-task-for-${task.id}' type='text' palceholder='The Change'/>
     <button id="delete-button-for-${task.id}"> delete </button>
     <button id="edit-task-button-for-${task.id}"> edit </button>
     </li>`)

     const listFinal = `<ul> ${list} </ul>`

     document.getElementById('planner-section').innerHTML = listFinal;

     arr.forEach((task) => {
         document.getElementById(`delete-button-for-${task.id}`).addEventListener('click', () => deleteTask(task.id))
         document.getElementById(`edit-task-button-for-${task.id}`).addEventListener('click', () => editTask(task.id));
        })
}