import render from "./render.js";

class TodoInfo {
  constructor(todoList, activeFilter, setTodoList, setActiveFilter) {
    this.todoInfo = document.querySelector(".todoInfo");
    this.underLines = document.querySelector(".underLines");
    this.itemNumber = document.querySelector(".itemNumber");
    this.clearBtn = document.querySelector(".clearCompletedBtn");
    this.allBtn = document.querySelector(".allBtn");
    this.activeBtn = document.querySelector(".activeBtn");
    this.compleatedBtn = document.querySelector(".compleatedBtn");

    // this.list = document.querySelector("ul");

    console.log(todoList)
    
    this.allBtn.classList.add("buttonActive");
    this.render = render.bind(this);

    this.infoButtons = [
      {
        buttonName: this.allBtn,
        id: "all",
      },
      {
        buttonName: this.activeBtn,
        id: "active",
      },
      {
        buttonName: this.compleatedBtn,
        id: "completed",
      },
    ];

    this.setTodoList = function (newTodoList) {
      todoList = newTodoList;
      this.render(todoList, activeFilter);
      this.updateClearCompletedBtn();
      this.updateTodoInfo();

      setTodoList(todoList)
    };

    this.setActiveFilter = function (newFilter) {
      activeFilter = newFilter;

      this.selectActiveInfoButton();
      this.render(todoList, activeFilter);

      setActiveFilter(activeFilter)
    };

    this.selectActiveInfoButton = function () {
      this.infoButtons.forEach((btn) =>
        btn.buttonName.classList[
          btn.id === activeFilter ? "add" : "remove"
        ]("buttonActive")
      );
    };

    this.changeActiveFilter = ({ target: { textContent } }) => {
      this.setActiveFilter(textContent.toLowerCase());
      console.log(activeFilter);
      console.log(todoList);
    };

    this.allBtn.addEventListener("click", (e) => {
      this.changeActiveFilter(e);
    });

    this.activeBtn.addEventListener("click", (e) => {
      this.changeActiveFilter(e);
    });

    this.compleatedBtn.addEventListener("click", (e) => {
      this.changeActiveFilter(e);
    });

    this.clearCompleted = () => {
      this.setTodoList(todoList.filter((item) => item.done === false));
    };

    this.clearBtn.addEventListener("click", this.clearCompleted);

    this.updateClearCompletedBtn = () => {
      const isTodoItemChecked = todoList.some(
        (item) => item.done === true
      );

      this.clearBtn.classList.add("clearCompleatedBtn");
      this.clearBtn.classList[isTodoItemChecked ? "add" : "remove"](
        "clearCompletedBtnVisible"
      );
    };

    this.clearBtn.addEventListener("click", this.clearCompleted);

    this.updateTodoInfo = () => {
      const notCheckeditems = todoList.filter(
        (item) => item.done === false
      );

      this.todoInfo.classList.add("todoInfoHide");
      this.underLines.classList.add("underLinesHide");

      if (todoList.length) {
        this.itemNumber.textContent = `${notCheckeditems.length} item left`;
        this.todoInfo.classList.remove("todoInfoHide");
        this.underLines.classList.remove("underLinesHide");
        if (notCheckeditems.length > 1 || notCheckeditems.length === 0) {
          this.itemNumber.textContent = `${notCheckeditems.length} items left`;
        }
      }
    };
    console.log(todoList)

  }
}
export default TodoInfo;
