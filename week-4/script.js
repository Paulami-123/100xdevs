let globalId = 1;
let todoState = [];
let oldTodoState = [];

function addTodoToDom(todo) {
  let todoList = document.getElementById("todos");

  const newTodo = document.createElement("div");
  newTodo.setAttribute("id", todo.id);

  const title = document.createElement("div");
  title.innerHTML = todo.title;

  const desc = document.createElement("div");
  desc.innerHTML = todo.description;

  const btn = document.createElement("button");
  btn.setAttribute("onClick", `isDone(${todo.id})`);
  btn.innerHTML = "Mark as Done";

  newTodo.appendChild(title);
  newTodo.appendChild(desc);
  newTodo.appendChild(btn);

  todoList.appendChild(newTodo);
}

function removeTodoFromDom(todo) {
  let todoList = document.getElementById("todos");
  const remTodo = document.getElementById(todo.id);
  todoList.removeChild(remTodo);
}

function updateTodoInDom(oldTodo, newTodo) {
    const todo = document.getElementById(oldTodo.id);
    todo.children[0].innerHTML = newTodo.title;
    todo.children[1].innerHTML = newTodo.description;
    todo.children[2].innerHTML = newTodo.completed ? "Mark as Done" : "Done!";
    const comment = document.createElement("div");
}

function isTodoUpdated(oldTodo, newTodo){
  if(oldTodo.title!==newTodo.title){
    return true;
  }
  else if(oldTodo.description!==newTodo.description){
    return true;
  }
  else if(oldTodo.completed!==newTodo.completed){
    return true;
  }
  return false;
}

function isDone(todoId){
  const todo = document.getElementById(todoId);
  todo.children[2].innerHTML = "Done!!";
}

function updateState(newTodos) {
  // calculate the diff b/w newTodos and oldTodos.
  // More specifically, find out what todos are - 
  // 1. added
  // 2. deleted
  // 3. updated
  const added = [];
  const deleted = [];
  const updated = [];
  // calculate these 3 arrays
  // call addTodo, removeTodo, updateTodo functions on each of the
  // elements

  newTodos.forEach(nTodo => {
    const oldTodo = oldTodoState.find(oTodo => oTodo.id===nTodo.id);
    if(!oldTodo){
      added.push(nTodo);
    }
    else if(oldTodo && isTodoUpdated(oldTodo, nTodo)){
      updated.push(nTodo);
      updateTodoInDom(oldTodo, nTodo);
    }
  });

  oldTodoState.forEach(oTodo => {
    const newTodo = newTodos.find(nTodo => nTodo.id===oTodo.id);
    if(!newTodo){
      deleted.push(oTodo);
    }
  })
  
  added.forEach(todo => addTodoToDom(todo));
  deleted.forEach(todo => removeTodoFromDom(todo))
  oldTodoState = newTodos;
}

async function addTodo() {
  const response = await fetch("https://sum-server.100xdevs.com/todos");
  const data = await response.json();

  console.log(data.todos);

  updateState(data.todos);
}