import EventEmitter from './EventEmitter.js'

class StateContainer {
	static instance
	static getInstance() {
		if (!TodoListContainer.instance) {
			TodoListContainer.instance = new TodoListContainer()
		}
		return TodoListContainer.instance
	}
	constructor() {
		this.todoItemList = []
		this.activeFilter = {
			filter: 'all',
		}

		this.eventEmitter = EventEmitter.getInstance()

		this.eventEmitter.subscribe('setActiveFilter', this.setActiveFilter)
		this.eventEmitter.subscribe('setTodoList', this.setTodoList)
	}

	getState() {
		return (this.globalState = {
			todoItemList: this.todoItemList,
			activeFilter: this.activeFilter,
		})
	}

	setActiveFilter = (newActiveFilter) => {
		this.activeFilter.filter = newActiveFilter
		this.eventEmitter.emit('todoListRender', this.getState().todoItemList)
	}

	setTodoList = (newTodoItemList) => {
		this.todoItemList = newTodoItemList
		this.eventEmitter.emit('todoListRender', this.getState().todoItemList)
	}
}
export default StateContainer
