import render from "./render.js";

class TodoList {
  constructor(todoList, setTodoList, activeFilter) {
    this.todoInput = document.querySelector("input");
    this.inputArrow = document.querySelector(".arrow");

    this.render = render.bind(this);

    this.setTodoList = (newTodoList) => {
      todoList = newTodoList;

      this.render(todoList, activeFilter);
      this.changeInputArrowColor();
      this.updateInputArrow();
      setTodoList(todoList)
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
        ...todoList,
        {
          value: itemValue,
          id: Date.now(),
          done: false,
        },
      ]);

      console.log(todoList);
    };

    this.deleteTodoItem = function (todoId) {
      this.setTodoList(todoList.filter((elem) => elem.id !== +todoId));
    };

    this.changeItemStatus = function (id, isChecked) {
      this.setTodoList(
        todoList.map((item) =>
          id === item.id ? { ...item, done: isChecked } : item
        )
      );
    };

    this.checkAllItems = function (arr) {
      const isCheckedAllItems = arr.every((item) => item.done === true);
      return isCheckedAllItems;
    };

    this.inputArrow.addEventListener("click", () => {
      this.changeAllItemsStatus(this.checkAllItems(todoList));
    });

    this.changeAllItemsStatus = function (isCheckedAllItems) {
      this.setTodoList(
        todoList.map((item) =>
          isCheckedAllItems ? { ...item, done: false } : { ...item, done: true }
        )
      );
    };

    this.changeInputArrowColor = function () {
      this.inputArrow.classList[
        this.checkAllItems(todoList) ? "add" : "remove"
      ]("arrowDark");
    };

    this.updateInputArrow = function () {
      this.inputArrow.classList[todoList.length ? "add" : "remove"](
        "arrowVisible"
      );
    };

    this.makeTodoEditHandler = function (input, label, delBtn) {
      const changeItemValue = () => {
        const itemValue = input.value.trim();
        const parentId = +input.parentElement.parentElement.dataset.todoId;
        this.setTodoList(
          todoList.map((item) =>
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
