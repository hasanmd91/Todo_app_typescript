const form = document.querySelector<HTMLFormElement>("#form")!;
const titleInput = document.querySelector<HTMLInputElement>("#titleInput")!;
const dateInput = document.querySelector<HTMLInputElement>("#dateInput")!;
const textInput = document.querySelector<HTMLInputElement>("#textInput")!;
const tasks = document.querySelector<HTMLDivElement>("#tasks")!;
const add = document.querySelector<HTMLButtonElement>("#add")!;

interface Todo {
  title: string;
  date: Date | string;
  text: string;
}

let data: Todo[] = [];

// create todo
const createTodo = () => {
  tasks.innerHTML = "";
  data.map((todo, index) => {
    tasks.insertAdjacentHTML(
      "afterbegin",
      `<div id=${index}>
        <span class="fw-bold"> ${todo.title} </span>
        <span class="small text-secondary">${todo.date}</span>
        <p>${todo.text}</p>
        <span class="options">
          <i onclick="editTask(this)" class="fa-solid fa-pen-to-square"  data-bs-toggle="modal" data-bs-target="#form" ></i>
          <i onclick="deleteTask(this)" class="fa-solid fa-trash"></i>
        </span>
      </div> `
    );
  });
};

// form submitting & data store in local storage

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  data.push({
    title: titleInput.value,
    date: dateInput.value,
    text: textInput.value,
  });
  add.setAttribute("data-bs-dismiss", "modal");
  createTodo();
  add.click();
  localStorage.setItem("data", JSON.stringify(data));
  clearForm();
});

//delete function
const deleteTask = (e: HTMLElement): void => {
  e.parentElement?.parentElement?.remove();
  data.splice(Number(e.parentElement?.parentElement?.id), 1);
  localStorage.setItem("data", JSON.stringify(data));
};

//edit Task
const editTask = (e: HTMLElement): void => {
  e.parentElement?.parentElement?.remove();
  const selectedItem = e.parentElement?.parentElement;
  titleInput.value = selectedItem?.children[0].innerHTML || "";
  dateInput.value = selectedItem?.children[1].innerHTML || "";
  textInput.value = selectedItem?.children[2].innerHTML || "";
  deleteTask(e);
};

// IIFE
(() => {
  data = JSON.parse(localStorage.getItem("data") || "[]");
  createTodo();
})();

// clear form
const clearForm = (): void => {
  titleInput.value = "";
  dateInput.value = "";
  textInput.value = "";
};
