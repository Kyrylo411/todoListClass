import TodoInfo from "./TodoInfo.js";
import TodoList from "./TodoList.js";

class State {
  constructor() {
    this.todoList = [];
    this.activeFilter = "all";

    
    this.setTodoList = (newTodoList) => {
      this.todoList = newTodoList;
      console.log(this.todoList);
    };

    this.setActiveFilter = (newFilter) => {
      this.activeFilter = newFilter;
      console.log(this.todoList);
      console.log(this.activeFilter);
    };

    console.log(this.todoList)

    const todoList = new TodoList(
      this.todoList,
      this.setTodoList,
      this.activeFilter,
    );

    const todoInfo = new TodoInfo(
      this.todoList,
      this.activeFilter,
      this.setTodoList,
      this.setActiveFilter
    );
  }  
}

export default State;
