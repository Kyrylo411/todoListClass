import EventEmitter from './EventEmitter.js'
import TodoListContainer from './TodoListContainer.js'

class TodoInfo {
	constructor() {
		this.todoInfo = document.querySelector('.todoInfo')
		this.underLines = document.querySelector('.underLines')
		this.itemNumber = document.querySelector('.itemNumber')
		this.clearBtn = document.querySelector('.clearCompletedBtn')
		this.allBtn = document.querySelector('.allBtn')
		this.activeBtn = document.querySelector('.activeBtn')
		this.compleatedBtn = document.querySelector('.compleatedBtn')

		this.allBtn.classList.add('buttonActive')

		this.todoInfo.classList.add('todoInfoHide')
		this.underLines.classList.add('underLinesHide')

		this.infoButtons = [
			{
				buttonName: this.allBtn,
				id: 'all',
			},
			{
				buttonName: this.activeBtn,
				id: 'active',
			},
			{
				buttonName: this.compleatedBtn,
				id: 'completed',
			},
		]

		this.eventEmitter = EventEmitter.getInstance()
		this.globalStateContainer = TodoListContainer.getInstance()

		console.log(this.eventEmitter)
		console.log(this.globalStateContainer.getState().activeFilter)

		this.allBtn.addEventListener('click', (e) => {
			this.changeActiveFilter(e)
		})

		this.activeBtn.addEventListener('click', (e) => {
			this.changeActiveFilter(e)
		})

		this.compleatedBtn.addEventListener('click', (e) => {
			this.changeActiveFilter(e)
		})
		this.clearBtn.addEventListener('click', () => this.clearCompleted())

		this.eventEmitter.subscribe('todoListRender', this.todoInfoRender)
	}

	todoInfoRender = () => {
		this.selectActiveInfoButton()
		this.updateClearCompletedBtn()
		this.updateTodoInfo()
	}

	changeActiveFilter = ({ target: { textContent } }) => {
		this.eventEmitter.emit('setActiveFilter', textContent.toLowerCase())
	}

	selectActiveInfoButton = () => {
		this.infoButtons.forEach((btn) =>
			btn.buttonName.classList[
				btn.id === this.globalStateContainer.getState().activeFilter.filter
					? 'add'
					: 'remove'
			]('buttonActive'),
		)
	}

	updateClearCompletedBtn = () => {
		const isTodoItemChecked = this.globalStateContainer
			.getState()
			.todoItemList.some((item) => item.done === true)

		this.clearBtn.classList.add('clearCompleatedBtn')
		this.clearBtn.classList[isTodoItemChecked ? 'add' : 'remove'](
			'clearCompletedBtnVisible',
		)
	}

	clearCompleted() {
		this.eventEmitter.emit(
			'setTodoList',
			this.globalStateContainer
				.getState()
				.todoItemList.filter((item) => item.done === false),
		)
	}

	changeActiveFilter({ target: { textContent } }) {
		this.eventEmitter.emit('setActiveFilter', textContent.toLowerCase())
	}

	updateTodoInfo = () => {
		const notCheckeditems = this.globalStateContainer
			.getState()
			.todoItemList.filter((item) => item.done === false)

		this.todoInfo.classList.add('todoInfoHide')
		this.underLines.classList.add('underLinesHide')

		if (this.globalStateContainer.getState().todoItemList.length) {
			this.itemNumber.textContent = `${notCheckeditems.length} item left`
			this.todoInfo.classList.remove('todoInfoHide')
			this.underLines.classList.remove('underLinesHide')
			if (notCheckeditems.length > 1 || notCheckeditems.length === 0) {
				this.itemNumber.textContent = `${notCheckeditems.length} items left`
			}
		}
	}
}
export default TodoInfo
