const itemRender = function () {
  this.list.innerText = "";

  const todoListToRender = this.todoList.filter((todoItem) => {
    const filterMap = {
      active: !todoItem.done ? todoItem : null,
      completed: todoItem.done ? todoItem : null,
      all: todoItem,
    };
    return filterMap[this.activeFilter];
  });

  todoListToRender.forEach((item) => {
    const li = document.createElement("li");
    const delBtn = document.createElement("div");
    const label = document.createElement("label");
    const checkInput = document.createElement("input");
    const checkmark = document.createElement("span");
    const itemText = document.createElement("p");
    const itemInputWrapper = document.createElement("div");
    const itemInput = document.createElement("input");

    itemInputWrapper.classList.add("itemInputWrapper");
    itemInput.classList.add("itemInput");
    itemText.classList.add("itemText");
    checkInput.setAttribute("type", "checkBox");
    label.classList.add("container");
    checkmark.classList.add("checkmark");
    delBtn.classList.add("delBtn");
    li.dataset.todoId = item.id;

    const editCurrentTodoItem = this.makeTodoEditHandler(
      itemInput,
      label,
      delBtn
    );

    li.addEventListener("click", editCurrentTodoItem);

    checkInput.addEventListener("change", (e) => {
      const id = +e.target.parentElement.parentElement.dataset.todoId;
      const isChecked = e.target.checked;
      this.changeItemStatus(id, isChecked);
    });

    if (item.done) {
      checkInput.setAttribute("checked", "checked");
    }

    itemText.classList.add([item.done ? "notActive" : "active"]);

    delBtn.classList.add("delBtn");
    delBtn.addEventListener(
      "click",
      ({
        target: {
          parentElement: {
            dataset: { todoId },
          },
        },
      }) => this.deleteTodoItem(todoId)
    );

    itemInputWrapper.append(itemInput);
    itemText.textContent = item.value;
    itemInput.value = item.value;

    label.append(checkInput, checkmark);
    li.append(label, itemText, itemInputWrapper, delBtn);
    this.list.append(li);
  });
};

export default itemRender;
