import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

// Select DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

// Initialize form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Initialize counter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Handle checkbox toggle
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

// Handle todo deletion
function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

// Function to generate todo element
const generateTodo = (item) => {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// Helper function to create and append a todo
const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
};

// Initialize section
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// Render initial todos
section.renderItems();

// Handle form submission
function handleAddTodoSubmit(inputValues) {
  const name = inputValues.name;
  const dateInput = inputValues.date;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  renderTodo(values);
  todoCounter.updateTotal(true);

  addTodoPopup.close();
  formValidator.resetValidation();
}

// Create popup instance
const addTodoPopup = new PopupWithForm("#add-todo-popup", handleAddTodoSubmit);
addTodoPopup.setEventListeners();

// Open popup listener
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
