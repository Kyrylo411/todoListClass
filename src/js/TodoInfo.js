class TodoInfo {
	constructor(globalState) {
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

		this.globalStateContainer = globalState

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
	}

	setTodoList(newTodoItemsList) {
		this.globalStateContainer.setTodoList(newTodoItemsList)
	}

	setActiveFilter(newFilter) {
		this.globalStateContainer.setActiveFilter(newFilter)
	}

	changeActiveFilter = ({ target: { textContent } }) => {
		this.setActiveFilter(textContent.toLowerCase())
	}

	selectActiveInfoButton() {
		this.infoButtons.forEach((btn) =>
			btn.buttonName.classList[
				btn.id === this.globalStateContainer.activeFilter.filter
					? 'add'
					: 'remove'
			]('buttonActive'),
		)
	}

	updateClearCompletedBtn() {
		const isTodoItemChecked = this.globalStateContainer.todoItemList.some(
			(item) => item.done === true,
		)

		this.clearBtn.classList.add('clearCompleatedBtn')
		this.clearBtn.classList[isTodoItemChecked ? 'add' : 'remove'](
			'clearCompletedBtnVisible',
		)
	}

	clearCompleted() {
		this.setTodoList(
			this.globalStateContainer.todoItemList.filter(
				(item) => item.done === false,
			),
		)
	}

	changeActiveFilter({ target: { textContent } }) {
		this.setActiveFilter(textContent.toLowerCase())
	}

	updateTodoInfo() {
		const notCheckeditems = this.globalStateContainer.todoItemList.filter(
			(item) => item.done === false,
		)

		this.todoInfo.classList.add('todoInfoHide')
		this.underLines.classList.add('underLinesHide')

		if (this.globalStateContainer.todoItemList.length) {
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
