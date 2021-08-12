import itemRender from "./itemRender.js";

class TodoList {
  constructor() {
    this.todoInput = document.querySelector("input");
    this.inputArrow = document.querySelector(".arrow");
    this.list = document.querySelector("ul");

    this.todoList = [];

    // this.itemRender = itemRender.bind(this);

    this.setTodoList = function (newTodoList) {
      this.todoList = newTodoList;
      // this.itemRender();
      this.changeInputArrowColor();
      this.updateInputArrow();
    };

    this.todoInput.addEventListener("keydown", (keyPressed) => {
      const itemValue = this.todoInput.value.trim();
      if (!itemValue) {
        this.todoInput.value = "";
        return;
      }
      if (keyPressed.key === "Enter") {
        this.addTodoItem(itemValue);
        this.todoInput.value = "";
      }
    });

    this.addTodoItem = function (itemValue) {
      this.setTodoList([
        ...this.todoList,
        {
          value: itemValue,
          id: Date.now(),
          done: false,
        },
      ]);
    };

    this.deleteTodoItem = function (todoId) {
      this.setTodoList(this.todoList.filter((elem) => elem.id !== +todoId));
    };

    this.changeItemStatus = function (id, isChecked) {
      this.setTodoList(
        this.todoList.map((item) =>
          id === item.id ? { ...item, done: isChecked } : item
        )
      );
    };

    this.checkAllItems = function (arr) {
      const isCheckedAllItems = arr.every((item) => item.done === true);
      return isCheckedAllItems;
    };

    this.inputArrow.addEventListener("click", () => {
      this.changeAllItemsStatus(this.checkAllItems(this.todoList));
    });

    this.changeAllItemsStatus = function (isCheckedAllItems) {
      this.setTodoList(
        this.todoList.map((item) =>
          isCheckedAllItems ? { ...item, done: false } : { ...item, done: true }
        )
      );
    };

    this.changeInputArrowColor = function () {
      this.inputArrow.classList[
        this.checkAllItems(this.todoList) ? "add" : "remove"
      ]("arrowDark");
    };

    this.updateInputArrow = function () {
      this.inputArrow.classList[this.todoList.length ? "add" : "remove"](
        "arrowVisible"
      );
    };

    this.makeTodoEditHandler = (input, label, delBtn) => {
      const changeItemValue = () => {
        const itemValue = input.value.trim();
        const parentId = +input.parentElement.parentElement.dataset.todoId;
        this.setTodoList(
          this.todoList.map((item) =>
            parentId === item.id ? { ...item, value: itemValue } : item
          )
        );
      };

      let lastClick = 0;
      return () => {
        input.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        input.addEventListener("blur", changeItemValue);

        input.addEventListener("keydown", (keyPressed) => {
          if (keyPressed.key === "Enter") {
            changeItemValue();
          }
        });

        const d = Date.now();
        const isDblClick = d - lastClick < 400 ? true : false;

        label.classList[isDblClick ? "add" : "remove"]("containerHide");
        delBtn.classList[isDblClick ? "add" : "remove"]("delBtnHide");
        input.classList[isDblClick ? "add" : "remove"]("itemInputVisible");

        input.focus();
        lastClick = d;
      };
    };
  }
}
export default TodoList;
