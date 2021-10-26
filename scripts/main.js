// document.querySelector('#task-form')
import app from "./index.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");
const taskTitle = document.getElementById("task-title");
const taskDes = document.getElementById("task-description");
const btnTaskForm = document.getElementById("btn-task-form");

let editStatus = false;
let id = "";

// const response = await db.collection('tasks').doc().set({
//     title,
//     description
// })

const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), {
    title,
    description
  });

const getTasks = () => getDocs(collection(db, "tasks")); //db.collection('tasks').get() //De la coleccion tareas obten todo

// const getTask = (id) => db.collection('tasks').doc(id).get();
const getTask = (id) => getDoc(doc(db, "tasks", id));

const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);
// const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

// const updateTask = (id, updatedTask) => db.collection("tasks").doc(id).update(updatedTask);
const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "tasks", id), updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();

  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      const task = doc.data();
      task.id = doc.id;

      taskContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.title}</h3>
                <p>${task.description}</p>
                <div>
                    <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
                    <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
                </div>
            </div>`;

      const btnsDelete = document.querySelectorAll(".btn-delete");
      // console.log(btnsDelete);
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          // console.log(e.target.dataset.id);
          await deleteTask(e.target.dataset.id);
        });
      });

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          // console.log('editing');
          // console.log(e.target.dataset.id);
          // const doc = await getTask(e.target.dataset.id);
          const doc = await getTask(e.target.dataset.id);

          // console.log(doc.data());
          const task = doc.data();

          editStatus = true;

          id = doc.id;

          taskTitle.value = task.title;
          taskDes.value = task.description;
          btnTaskForm.innerText = "Update";
        });
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // const title = taskForm["task-title"];
  // const description = taskForm["task-description"];

  const title = taskTitle;
  const description = taskDes;

  // console.log(title, description);

  // await saveTask(title, description);
  if (!editStatus) {
    await saveTask(title.value, description.value);
  } else {
    await updateTask(id, {
      title: title.value,
      description: description.value
    });

    editStatus = false;
    id = "";
    btnTaskForm.innerText = "Save";
  }

  await getTasks();

  taskForm.reset();
  taskTitle.focus();
});
