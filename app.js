//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); //linked to html <ul class="todo-list"></ul>
const filterOption = document.querySelector(".filter-todo"); //the select element of filter area

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //If the page loads up, run the getToDos function
todoButton.addEventListener("click", addToDo); //when plus button clicked, adds the todo
todoList.addEventListener("click", deleteCheck); //when trashcan clicked, deletes the todo
filterOption.addEventListener("click", filterToDo); //executes when arrow is clicked

//Functions

//This function adds the todo's

function addToDo(event) {
  //Prevent form from submitting
  event.preventDefault();

  //Todo Div- creates the todo list
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create list items
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //grabs the inputed text- the todo item- gives it a value
  newTodo.classList.add("todo-item"); //new classlist to use in css
  todoDiv.appendChild(newTodo); //grabs (newTodo.innerText) and makes it a list item

  //Add ToDo To LocalStorage from the saveLocalTodos function
  saveLocalTodos(todoInput.value);
  
  //Check Mark Button
  const completedButton = document.createElement("button"); //checkmark button
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; //adding checkmark icon
  completedButton.classList.add("complete-btn"); //new classlist to use in css
  todoDiv.appendChild(completedButton); //added to the div
 
  //Trash Button
  const trashButton = document.createElement("button"); //trashcan button
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //adding trashcan icon
  trashButton.classList.add("trash-btn"); //new classlist to use in css
  todoDiv.appendChild(trashButton); //added to the div
 
  //Append To List
  todoList.appendChild(todoDiv); //puts buttons, todo etc's in the tododiv
 
  //Clear Todo Input Value
  todoInput.value = ""; //clears the box of text
}

//Function to delete the todo items
function deleteCheck(e) {
  const item = e.target;
  
  //if statement- delete the todo when trash button is clicked
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
   
    //Animation
    todo.classList.add("fall"); //classList for the css .fall
    removeLocalTodos(todo); // connected to removeLocalTodos function
    //pause before fall away
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //if statement- lines out the todo item when checkmark is clicked
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed"); //class for css .completed
  }
}

//Function to filter through the todo items
function filterToDo(e) {
  const todos = todoList.childNodes; //targeting the todos
  //access the todos to use in for loop
  todos.forEach(function (todo) {
    //value is all, completed, uncompleted
    switch (e.target.value) {
      //switch cases
      case "all":
        //shows all if choosen
        todo.style.display = "flex";
        //breaksout if done
        break;
      case "completed":
        //only checking the todos marked completed
        if (todo.classList.contains("completed")) {
          //if they are completed, show them
          todo.style.display = "flex";
          //if they do not have completed, remove them
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
         //only checking the todos marked uncompleted, then repeating the actions above
         //! means not completed or "uncompleted"
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Function to save todos to local storage
function saveLocalTodos(todo) {
 
  //Check if there is already something in there

  //create variable
  let todos;
  //if statement- check to see if todo is there
  if (localStorage.getItem("todos") === null) {
    //if not create an empty array
    todos = [];
    //if there is parse back into todos array
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //pushing saved todo into todos array
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Connected to above- document.addEventListener("DOMContentLoaded", getTodos)
function getTodos() {
  
  //Follows the same steps as saveLocalTodos function
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
   
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
   
    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
   
    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //Append To List
    todoList.appendChild(todoDiv);
  });
}

//Removes todos from local storage with splice array method
function removeLocalTodos(todo) {
  
  //Gets down to the actual text
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText; //gets the index number of todo item
  todos.splice(todos.indexOf(todoIndex), 1); //where is it removed from, and how many items from the array
  localStorage.setItem("todos", JSON.stringify(todos));
}
