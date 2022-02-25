let command = process.argv[2]; //argv arguments start from 1
let argument1 = process.argv[3]; //name of task
let argument2 = process.argv[4]; //Description of the task
let todoList = [];

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
// localStorage.clear();

const todoHelp = () => {
  console.log("Ready to help whenever");
  console.log(
    "1. Operations:todo [add|delete|list] ['taskname'] ['task Description']"
  );
  console.log("2. Task should be string");
};

const getTodoData = () => {
  const todoLocal = [];
  //retrieve every taskname and push
  localStorage._keys.forEach((key) => {
    todoLocal.push(key);
  });
  return todoLocal;
};

const addTodo = (taskName, taskDesc) => {
  todoList = getTodoData();
  localStorage.setItem(taskName, taskDesc);

  //push new taskName
  todoList.push(taskName);
  console.log("Todo Added");
  listTodo();
};

const listTodo = () => {
  todoList = getTodoData();
  if (todoList.length > 0) {
    todoList.forEach((todo) => {
      //retrieve todo name and log the respective description
      console.log(`${todo}: ${localStorage.getItem(todo)}`);
    });
  } else {
    console.log("No tasks added");
  }
};

const deleteTodo = (todoName) => {
  localStorage.removeItem(todoName);
  listTodo();
};

switch (command) {
  case "help":
    todoHelp();
    break;
  case "add":
    addTodo(argument1, argument2);
    break;
  case "delete":
    deleteTodo(argument1);
    break;
  case "list":
  case undefined:
    listTodo();
    break;
  default:
    todoHelp();
    break;
}
// console.log(todoList);

// console.log(localStorage.getItem(1));
// console.log(localStorage._keys);
