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
  var name= document.getElementById("name").value;
  var description = document.getElementById("description").value;
  e.preventDefault();
  createName(name,description);
  form.reset();
});

function createName(newName,description) {
  counter+=1;
  var name={
    id:counter,
    name: newName,
    description:description
  }
  let db=firebase.database().ref("names/"+counter);
  db.set(name);
  document.getElementById("cardSection").innerHTML='';
  readName();
  const toast = Swal.mixin({
      toast:true,
      position: 'top-end',
      showConfirmButton:false,
      timer:3000
    });
    toast({
      type: 'success',
      title: 'name added !'
    });
}
function readName(){
  var name= firebase.database().ref("names/");
  name.on("child_added",function(data){
      var nameValue=data.val();

      document.getElementById("cardSection").innerHTML+=`
        <div class="card">
            <div class="card-content">
            <span class="card-title"> ${nameValue.name}</span>
            <p>${nameValue.description}</p>
            </div>
            <div class="card-action">
              <button type="submit" style="color:white" class="#f57f17 yellow darken-4 btn" onclick="updateName(${nameValue.id},'${nameValue.name}','${nameValue.description}')">
              <i class="fas fa-edit"></i> Edit Name
              </button>
              <button type="submit"  class="#b71c1c red darken-4 btn" onclick="deleteName(${nameValue.id})">
              <i class="fas fa-trash-alt"></i> Delete Name
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
            <label class="card-title" white-text>Name</label>
            <input type="text" white-text id="name" placeholder="Name">
            
            <br>
            <br>
            <button type="submit" id="button1" class="#00c853 green accent-4 btn">
              <i class="fas fa-plus"></i> ADD NAME
            </button>
          </form>
        </div>
      </div>
  `;
  document.getElementById("form").addEventListener("submit",(e)=>{
    var name= document.getElementById("name").value;
    var description= document.getElementById("description").value;
    e.preventDefault();
    createName(name,description);
    form.reset();
  });
}
function updateName(id,name,description){
  document.getElementById("firstSection").innerHTML=`
  <div class="card">
  <div class="card-content">
    <form id="form2">
      <label class="card-title" white-text>Name</label>
      <input type="text" white-text id="name" placeholder="Name">
      <label class="card-title" white-text>Description</label>
      <input type="text" white-text id="description" placeholder="Description">
      <br>
      <br>
      <button type="submit" id="button2" class="#303f9f indigo darken-2 btn">
        <i class="fas fa-sync"></i> UPDATE NAME
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
    updateName2(id,document.getElementById("name").value,document.getElementById("description").value);
  });
  document.getElementById("name").value=name;
  document.getElementById("description").value=description;
}
function updateName2(id,name,description){
  var nameUpdated={
    name:name,
    id:id,
    description:description
  }
  let db=firebase.database().ref("names/"+id);
  db.set(nameUpdated);
  document.getElementById("cardSection").innerHTML='';
  readName();
  reset();
  const toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton:false,
    timer:3000
  });
  toast({
    type: 'success',
    title: 'Name updated !'
  });
}

function deleteName(id){
  var name= firebase.database().ref("names/"+id);
  name.remove();
  reset();
  document.getElementById("cardSection").innerHTML='';
  readName();
  const toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton:false,
    timer:3000
  });
  toast({
    type: 'success',
    title: 'Name deleted !'
  });
}