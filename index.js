var form = document.querySelector("#form");
var titleInput = document.querySelector("#titleInput");
var dateInput = document.querySelector("#dateInput");
var textInput = document.querySelector("#textInput");
var tasks = document.querySelector("#tasks");
var add = document.querySelector("#add");
var data = [];
// create todo
var createTodo = function () {
    tasks.innerHTML = "";
    data.map(function (todo, index) {
        tasks.insertAdjacentHTML("afterbegin", "<div id=".concat(index, ">\n        <span class=\"fw-bold\"> ").concat(todo.title, " </span>\n        <span class=\"small text-secondary\">").concat(todo.date, "</span>\n        <p>").concat(todo.text, "</p>\n        <span class=\"options\">\n          <i onclick=\"editTask(this)\" class=\"fa-solid fa-pen-to-square\"  data-bs-toggle=\"modal\" data-bs-target=\"#form\" ></i>\n          <i onclick=\"deleteTask(this)\" class=\"fa-solid fa-trash\"></i>\n        </span>\n      </div> "));
    });
};
// form submitting & data store in local storage
form.addEventListener("submit", function (e) {
    e.preventDefault();
    data.push({
        title: titleInput.value,
        date: dateInput.value,
        text: textInput.value
    });
    add.setAttribute("data-bs-dismiss", "modal");
    createTodo();
    add.click();
    localStorage.setItem("data", JSON.stringify(data));
    clearForm();
});
//delete function
var deleteTask = function (e) {
    var _a, _b, _c, _d;
    (_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    data.splice(Number((_d = (_c = e.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.id), 1);
    localStorage.setItem("data", JSON.stringify(data));
};
//edit Task
var editTask = function (e) {
    var _a, _b, _c;
    (_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    var selectedItem = (_c = e.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
    titleInput.value = (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.children[0].innerHTML) || "";
    dateInput.value = (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.children[1].innerHTML) || "";
    textInput.value = (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.children[2].innerHTML) || "";
    deleteTask(e);
};
// IIFE
(function () {
    data = JSON.parse(localStorage.getItem("data") || "[]");
    createTodo();
})();
// clear form
var clearForm = function () {
    titleInput.value = "";
    dateInput.value = "";
    textInput.value = "";
};
