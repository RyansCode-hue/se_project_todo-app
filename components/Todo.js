class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
  }

  _generateLabelEl() {
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateNameEl() {
    this._todoNameEl.textContent = this._data.name;
  }

  _generateDateEl() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    // Get all the necessary elements
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    // Generate the content for each element
    this._generateCheckboxEl();
    this._generateLabelEl();
    this._generateNameEl();
    this._generateDateEl();

    // Set event listeners
    this._setEventListeners();

    // Return the finished element
    return this._todoElement;
  }
}

export default Todo;
