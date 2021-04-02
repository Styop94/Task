const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        resetLis();
    }
};


inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active");
  }
}

showTasks(); 

addBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  listArray.push([userEnteredValue, 1]); 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
  addBtn.classList.remove("active"); 
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  todoList.innerHTML = newLiTag;
  listArray.forEach((element, index) => {
    newLiTag += `<li id="item_${index}"><span onclick="editTask(this)" onkeyup="saveUpdates(${index})" class = "toDoText" id = "todo_text_${index}">${element[0]}</span><span id="btn_done_${index}" class="icon icon-done" onclick="setCompleted(this.id,${index})"><i class="fas fa-check"></i></span><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    todoList.innerHTML = newLiTag; 
    inputBox.value = ""; 

  });
    listArray.forEach((element, index) => {

    if(element[1] == 0){
      setCompleted("btn_done_" + index, index);
      console.log("element - " + element[0] + "   " + element[1]);
    }


  });
  
    }





function editTask(obj){

  var lis = document.getElementsByClassName("toDoText");
  for(var i = 0; i <= lis.length; i++){
      if(lis[i].id != obj.id){
        lis[i].contentEditable = false;
        lis[i].blur();
        lis[i].style.color = "black";

      }
      else{
        lis[i].contentEditable = true;
        lis[i].focus();
        lis[i].style.color = "red";      
      }

      
    }
}

function saveUpdates(index){
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  listArray = JSON.parse(getLocalStorageData);  
  listArray[index] = [document.getElementById("todo_text_" + index).innerHTML, 1];
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
}

function resetLis(){
  var lis = document.getElementsByClassName("toDoText");
  for(var i = 0; i <= lis.length; i++){
    lis[i].contentEditable = false;
    lis[i].blur();
    lis[i].style.color = "black";     
  } 
  
}


function setCompleted(objId,index){
  var text = document.getElementById("todo_text_" + index);
  var btn = document.getElementById(objId);
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  btn.style.display = "none";
  text.style.textDecoration =  "line-through";
  listArray = JSON.parse(getLocalStorageData);  
  listArray[index] = [document.getElementById("todo_text_" + index).innerHTML, 0];
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
}

function filter(type){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData); 
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    if (type == "active" && element[1] == 1) {
      newLiTag += `<li id="item_${index}"><span onclick="editTask(this)" onkeyup="saveUpdates(${index})" class = "toDoText" id = "todo_text_${index}">${element[0]}</span><span id="btn_done_${index}" class="icon icon-done" onclick="setCompleted(this.id,${index})"><i class="fas fa-check"></i></span><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    }
 
    else if (type == "completed" && element[1] == 0) {
      newLiTag += `<li id="item_${index}"><span onclick="editTask(this)" onkeyup="saveUpdates(${index})" class = "toDoText" id = "todo_text_${index}">${element[0]}</span><span id="btn_done_${index}" class="icon icon-done" onclick="setCompleted(this.id,${index})"><i class="fas fa-check"></i></span><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    }

    else if (type == "all") {
      newLiTag += `<li id="item_${index}"><span onclick="editTask(this)" onkeyup="saveUpdates(${index})" class = "toDoText" id = "todo_text_${index}">${element[0]}</span><span id="btn_done_${index}" class="icon icon-done" onclick="setCompleted(this.id,${index})"><i class="fas fa-check"></i></span><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    }
    todoList.innerHTML = newLiTag; 
    inputBox.value = ""; 

  });

    if(type == "completed" || type == "all"){
      listArray.forEach((element, index) => {

      if(element[1] == 0){
        setCompleted("btn_done_" + index, index);
        console.log("element - " + element[0] + "   " + element[1]);
      }

    });

    }

  

}


function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


deleteAllBtn.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}
