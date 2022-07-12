import {getDatabase,ref,get,set,update,remove,child} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

var rollV, nameV, genV, addV;
const db=getDatabase();

var RollBox=document.getElementById("rollBox");
var NameBox=document.getElementById("nameBox");
var GenBox=document.getElementById("genBox");
var AddBox=document.getElementById("addBox");

function insertData(event){
    event.preventDefault();
    readFormData();
    set(ref(db,"data/"+rollV),{
        rollNo: rollV,
        name:nameV,
        gender:genV,
        address:addV,
    }).then(()=>{
        alert("Done");
    }).catch((error)=>{
        alert("Unsuccessful ",error);
    }); 
    clearform();
}

function readData(event){
    event.preventDefault();
    readFormData();
    const dbref=ref(db);
    get(child(dbref,'data/'+rollV))
    .then((snapshot)=>{
        if(snapshot.exists()){
            NameBox.value=snapshot.val().name;
            GenBox.value=snapshot.val().gender;
            AddBox.value=snapshot.val().address;
        }
        else
        {
            alert("No data Found");
        }
    }).catch((error)=>{
        alert("Unsuccessful ",error);
    }); 
}

function updateData(event){
    event.preventDefault();
    readFormData();
    update(ref(db,"data/"+rollV),{
        name:nameV,
        gender:genV,
        address:addV,
    }).then(()=>{
        alert("Done");
    }).catch((error)=>{
        alert("Unsuccessful ",error);
    }); 
    clearform();
}

function deleteData(event){
    event.preventDefault();
    readFormData();
    if(confirm("Are You Sure")){
        remove(ref(db,"data/"+rollV)).then(()=>{
            alert("Done");
        }).catch((error)=>{
            alert("Unsuccessful ",error);
        }); 
    }
    clearform();
}

function readFormData(){
    rollV=RollBox.value;
    nameV=NameBox.value;
    genV=GenBox.value;
    addV=AddBox.value;
}

function clearform(){
    RollBox.value="";
    NameBox.value="";
    GenBox.value="";
    AddBox.value="";
}

document.querySelectorAll(".btn")[0].onclick=insertData;
document.querySelectorAll(".btn")[1].onclick=readData;
document.querySelectorAll(".btn")[2].onclick=updateData;
document.querySelectorAll(".btn")[3].onclick=deleteData;