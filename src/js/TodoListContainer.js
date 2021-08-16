import TodoInfo from './TodoInfo.js'
import TodoList from './TodoList.js'

class TodoListContainer {
	constructor() {
		this.todoItemList = []
		this.activeFilter = {
			filter: 'all',
		}

		this.todoList = new TodoList(this)
		this.todoInfo = new TodoInfo(this)
	}

	setTodoList(newTodoItemList) {
		this.todoItemList = newTodoItemList
		this.render()
	}

	setActiveFilter(newFilter) {
		this.activeFilter.filter = newFilter
		this.render()
	}

	render() {
		this.todoList.render()
		this.todoList.changeInputArrowColor()
		this.todoList.updateInputArrow()

		this.todoInfo.selectActiveInfoButton()
		this.todoInfo.updateClearCompletedBtn()
		this.todoInfo.updateTodoInfo()
	}
}
export default TodoListContainer
