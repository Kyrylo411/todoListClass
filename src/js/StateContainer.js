import EventEmitter from './EventEmitter.js'

class StateContainer {
	static instance
	static getInstance() {
		if (!StateContainer.instance) {
			StateContainer.instance = new StateContainer()
		}
		return StateContainer.instance
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
		return {
			todoItemList: this.todoItemList,
			activeFilter: this.activeFilter,
		}
	}

	setActiveFilter = (newActiveFilter) => {
		this.activeFilter.filter = newActiveFilter
		this.eventEmitter.emit('todoListRender')
	}

	setTodoList = (newTodoItemList) => {
		this.todoItemList = newTodoItemList
		this.eventEmitter.emit('todoListRender')
	}
}
export default StateContainer
