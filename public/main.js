 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAx8S90WUXNDuAgIwe_O9IfytWQ0TnSur0",
  authDomain: "crudmaterial-b8d0f.firebaseapp.com",
  databaseURL: "https://crudmaterial-b8d0f.firebaseio.com",
  projectId: "crudmaterial-b8d0f",
  storageBucket: "",
  messagingSenderId: "555877914999"
};
firebase.initializeApp(config);

var d= new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit",(e)=>{
  var task= document.getElementById("task").value;
  var description = document.getElementById("description").value;
  e.preventDefault();
  createTask(task,description);
  form.reset();
});

function createTask(taskName,description) {
  counter+=1;
  var task={
    id:counter,
    task: taskName,
    description:description
  }
  let db=firebase.database().ref("tasks/"+counter);
  db.set(task);
  document.getElementById("cardSection").innerHTML='';
  readTask();
  const toast = Swal.mixin({
      toast:true,
      position: 'top-end',
      showConfirmButton:false,
      timer:3000
    });
    toast({
      type: 'success',
      title: 'Task added !'
    });
}
function readTask(){
  var task= firebase.database().ref("tasks/");
  task.on("child_added",function(data){
      var taskValue=data.val();

      document.getElementById("cardSection").innerHTML+=`
        <div class="card">
            <div class="card-content">
            <span class="card-title"> ${taskValue.task}</span>
            <p>${taskValue.description}</p>
            </div>
            <div class="card-action">
              <button type="submit" style="color:white" class="#f57f17 yellow darken-4 btn" onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')">
              <i class="fas fa-edit"></i> Edit Task
              </button>
              <button type="submit"  class="#b71c1c red darken-4 btn" onclick="deleteTask(${taskValue.id})">
              <i class="fas fa-trash-alt"></i> Delete Task
              </button>
            </div>
        </div>

      `
  });
}
function reset(){
  document.getElementById("firstSection").innerHTML=`
  <div class="card">
        <div class="card-content">
          <form id="form">
            <label class="card-title" white-text>Task</label>
            <input type="text" white-text id="task" placeholder="Task">
            
            <br>
            <br>
            <button type="submit" id="button1" class="#00c853 green accent-4 btn">
              <i class="fas fa-plus"></i> ADD TASK
            </button>
          </form>
        </div>
      </div>
  `;
  document.getElementById("form").addEventListener("submit",(e)=>{
    var task= document.getElementById("task").value;
    var description= document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form.reset();
  });
}
function updateTask(id,name,description){
  document.getElementById("firstSection").innerHTML=`
  <div class="card">
  <div class="card-content">
    <form id="form2">
      <label class="card-title" white-text>Task</label>
      <input type="text" white-text id="task" placeholder="Task">
      <label class="card-title" white-text>Description</label>
      <input type="text" white-text id="description" placeholder="Description">
      <br>
      <br>
      <button type="submit" id="button2" class="#303f9f indigo darken-2 btn">
        <i class="fas fa-sync"></i> UPDATE TASK
      </button>
      <button type="submit" id="button3" class="btn">
        <i class="fas fa-ban"></i> CANCEL 
      </button>
    </form>
  </div>
</div>
  
  `;
  document.getElementById("form2").addEventListener("submit",(e)=>{
    e.preventDefault();
  });
  document.getElementById("button3").addEventListener("click",(e)=>{
    reset();
  });
  document.getElementById("button2").addEventListener("click",(e)=>{
    updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
  });
  document.getElementById("task").value=name;
  document.getElementById("description").value=description;
}
function updateTask2(id,name,description){
  var taskUpdated={
    task:name,
    id:id,
    description:description
  }
  let db=firebase.database().ref("tasks/"+id);
  db.set(taskUpdated);
  document.getElementById("cardSection").innerHTML='';
  readTask();
  reset();
  const toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton:false,
    timer:3000
  });
  toast({
    type: 'success',
    title: 'Task updated !'
  });
}

function deleteTask(id){
  var task= firebase.database().ref("tasks/"+id);
  task.remove();
  reset();
  document.getElementById("cardSection").innerHTML='';
  readTask();
  const toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton:false,
    timer:3000
  });
  toast({
    type: 'success',
    title: 'Task deleted !'
  });
}