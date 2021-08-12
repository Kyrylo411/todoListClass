import TodoList from "./TodoList.js";
import itemRender from "./itemRender.js";

class TodoInfo extends TodoList {
  constructor() {
    super();
    this.todoInfo = document.querySelector(".todoInfo");
    this.underLines = document.querySelector(".underLines");
    this.itemNumber = document.querySelector(".itemNumber");
    this.clearBtn = document.querySelector(".clearCompletedBtn");
    this.allBtn = document.querySelector(".allBtn");
    this.activeBtn = document.querySelector(".activeBtn");
    this.compleatedBtn = document.querySelector(".compleatedBtn");

    this.allBtn.classList.add("buttonActive");
    this.activeFilter = "all";

    this.itemRender = itemRender.bind(this);

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
      this.todoList = newTodoList;
      this.itemRender();
      this.changeInputArrowColor();
      this.updateInputArrow();
      this.updateClearCompletedBtn();
      this.updateTodoInfo();
    };

    this.setActiveFilter = (newFilter) => {
      this.activeFilter = newFilter;

      this.selectActiveInfoButton();
      this.itemRender();
    };

    this.selectActiveInfoButton = () => {
      this.infoButtons.forEach((btn) =>
        btn.buttonName.classList[
          btn.id === this.activeFilter ? "add" : "remove"
        ]("buttonActive")
      );
    };

    this.changeActiveFilter = ({ target: { textContent } }) => {
      this.setActiveFilter(textContent.toLowerCase());
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
      this.setTodoList(this.todoList.filter((item) => item.done === false));
    };

    this.clearBtn.addEventListener("click", this.clearCompleted);

    this.updateClearCompletedBtn = () => {
      const isTodoItemChecked = this.todoList.some(
        (item) => item.done === true
      );

      this.clearBtn.classList.add("clearCompleatedBtn");
      this.clearBtn.classList[isTodoItemChecked ? "add" : "remove"](
        "clearCompletedBtnVisible"
      );
    };

    this.clearBtn.addEventListener("click", this.clearCompleted);

    this.updateTodoInfo = () => {
      const notCheckeditems = this.todoList.filter(
        (item) => item.done === false
      );

      this.todoInfo.classList.add("todoInfoHide");
      this.underLines.classList.add("underLinesHide");

      if (this.todoList.length) {
        this.itemNumber.textContent = `${notCheckeditems.length} item left`;
        this.todoInfo.classList.remove("todoInfoHide");
        this.underLines.classList.remove("underLinesHide");
        if (notCheckeditems.length > 1 || notCheckeditems.length === 0) {
          this.itemNumber.textContent = `${notCheckeditems.length} items left`;
        }
      }
    };
  }
}
export default TodoInfo;
