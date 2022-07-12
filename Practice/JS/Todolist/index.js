const $ = (query) => document.querySelector(query);
const $$ = (query) => document.querySelectorAll(query)
let emptyList = []
let addedTasksList = JSON.parse(localStorage.getItem("added-tasks"));
const main = $(".main")
const taskInput = $(".add-task__input")

const showAddedTasks = (i) => {
  const newTaskBox = document.createElement('div')
  main.appendChild(newTaskBox)
  newTaskBox.innerHTML = `<button class="main__check"><img style="width:17px; height:17px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoid9vNtngdqy2LFxKyT8RguaWcWChVVZqHyhwTfrMbOhagh8iNafkpxmKqcPIULV6ahg&usqp=CAU" alt="원"></button>
      <div id="main__task" class="main__task">${addedTasksList[i]}</div>
      <button class="main__delete">❌</button>`
}
if (addedTasksList !== null) {
  for (let i = 0; i < addedTasksList.length; i++) {
    showAddedTasks(i);
  }
}

const clearTaskList = () => {
  window.localStorage.clear();
  location.reload()
}
$(".clear-btn").addEventListener("click", clearTaskList)

const clearTaskItem = (i) => {
  console.log(i)
  if (true || e.target.classList.contains("main__delete")) {
    console.log(i);
    addedTasksList.shift()
    localStorage.setItem("added-tasks", JSON.stringify(addedTasksList))
    main.children[i].remove()
  }
}

if ($(".main > div") !== null) {
  for (let i = 0; i < $$(".main > div").length; i++) {
    $$(".main > div")[i].addEventListener("click", () => clearTaskItem(i))
  }
}

const completeTask = () => {
  $("#main__task").classList.add("main__task-completed")
}

const setStorage = () => {
  if (addedTasksList == null) {
    emptyList.push(taskInput.value)
    localStorage.setItem("added-tasks", JSON.stringify(emptyList))
  } else {
    addedTasksList.push(taskInput.value)
    localStorage.setItem("added-tasks", JSON.stringify(addedTasksList))
  }
}

const addTask = () => {
  const newTaskBox = document.createElement('div')
  main.appendChild(newTaskBox)

  newTaskBox.innerHTML = `<button class="main__check"><img style="width:17px; height:17px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoid9vNtngdqy2LFxKyT8RguaWcWChVVZqHyhwTfrMbOhagh8iNafkpxmKqcPIULV6ahg&usqp=CAU" alt="원"></button>
      <div id="main__task" class="main__task">${taskInput.value}</div>
      <button class="main__delete">❌</button>`
  setStorage();
  location.reload();
  newTaskBox.addEventListener("click", completeTask)
}
$(".add-task__btn").addEventListener("click", addTask)

const enterTask = (e) => {
  if (e.key == "Enter") {
    addTask()
  }
}
window.addEventListener('keydown', enterTask)