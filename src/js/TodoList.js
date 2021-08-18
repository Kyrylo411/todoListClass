import EventEmitter from './EventEmitter.js'
import StateContainer from './StateContainer.js'
class TodoList {
	constructor() {
		this.todoInput = document.querySelector('input')
		this.inputArrow = document.querySelector('.arrow')
		this.list = document.querySelector('ul')

		this.eventEmitter = EventEmitter.getInstance()
		this.globalStateContainer = StateContainer.getInstance()

		this.todoInput.addEventListener('keydown', (keyPressed) => {
			const itemValue = this.todoInput.value.trim()
			if (!itemValue) {
				this.todoInput.value = ''
				return
			}
			if (keyPressed.key === 'Enter') {
				this.addTodoItem(itemValue)
				this.todoInput.value = ''
			}
		})

		this.inputArrow.addEventListener('click', () => {
			this.changeAllItemsStatus(
				this.checkAllItems(this.globalStateContainer.todoItemList),
			)
		})
		this.eventEmitter.subscribe('todoListRender', this.todoListRender)
	}

	todoListRender = () => {
		this.render()
		this.updateInputArrow()
		this.changeInputArrowColor()
	}

	addTodoItem(itemValue) {
		this.eventEmitter.emit('setTodoList', [
			...this.globalStateContainer.todoItemList,
			{
				value: itemValue,
				id: Date.now(),
				done: false,
			},
		])
	}

	updateInputArrow = () => {
		this.inputArrow.classList[
			this.globalStateContainer.todoItemList.length ? 'add' : 'remove'
		]('arrowVisible')
	}

	checkAllItems(arr) {
		const isCheckedAllItems = arr.every((item) => item.done === true)
		return isCheckedAllItems
	}

	changeAllItemsStatus(isCheckedAllItems) {
		this.eventEmitter.emit(
			'setTodoList',
			this.globalStateContainer.todoItemList.map((item) =>
				isCheckedAllItems ? { ...item, done: false } : { ...item, done: true },
			),
		)
	}

	changeInputArrowColor = () => {
		this.inputArrow.classList[
			this.checkAllItems(this.globalStateContainer.todoItemList)
				? 'add'
				: 'remove'
		]('arrowDark')
	}

	render = () => {
		this.list.innerText = ''
		const todoListToRender = this.globalStateContainer.todoItemList.filter(
			(todoItem) => {
				const filterMap = {
					active: !todoItem.done ? todoItem : null,
					completed: todoItem.done ? todoItem : null,
					all: todoItem,
				}
				return filterMap[this.globalStateContainer.activeFilter.filter]
			},
		)

		todoListToRender.forEach((item) => {
			const li = document.createElement('li')
			const delBtn = document.createElement('div')
			const label = document.createElement('label')
			const checkInput = document.createElement('input')
			const checkmark = document.createElement('span')
			const itemText = document.createElement('p')
			const itemInputWrapper = document.createElement('div')
			const itemInput = document.createElement('input')

			itemInputWrapper.classList.add('itemInputWrapper')
			itemInput.classList.add('itemInput')
			itemText.classList.add('itemText')
			checkInput.setAttribute('type', 'checkBox')
			label.classList.add('container')
			checkmark.classList.add('checkmark')
			delBtn.classList.add('delBtn')
			li.dataset.todoId = item.id

			this.editCurrentTodoItem = this.makeTodoEditHandler(
				itemInput,
				label,
				delBtn,
			)

			li.addEventListener('click', this.editCurrentTodoItem)

			checkInput.addEventListener('change', (e) => {
				const id = +e.target.parentElement.parentElement.dataset.todoId
				const isChecked = e.target.checked
				this.changeItemStatus(id, isChecked)
			})

			if (item.done) {
				checkInput.setAttribute('checked', 'checked')
			}

			itemText.classList.add([item.done ? 'notActive' : 'active'])

			delBtn.classList.add('delBtn')
			delBtn.addEventListener(
				'click',
				({
					target: {
						parentElement: {
							dataset: { todoId },
						},
					},
				}) => this.deleteTodoItem(todoId),
			)

			itemInputWrapper.append(itemInput)
			itemText.textContent = item.value
			itemInput.value = item.value

			label.append(checkInput, checkmark)
			li.append(label, itemText, itemInputWrapper, delBtn)
			this.list.append(li)
		})
	}

	deleteTodoItem(todoId) {
		this.eventEmitter.emit(
			'setTodoList',
			this.globalStateContainer.todoItemList.filter(
				(elem) => elem.id !== +todoId,
			),
		)
	}

	changeItemStatus(id, isChecked) {
		this.eventEmitter.emit(
			'setTodoList',
			this.globalStateContainer.todoItemList.map((item) =>
				id === item.id ? { ...item, done: isChecked } : item,
			),
		)
	}

	makeTodoEditHandler = function (input, label, delBtn) {
		const changeItemValue = () => {
			const itemValue = input.value.trim()
			const parentId = +input.parentElement.parentElement.dataset.todoId
			this.eventEmitter.emit(
				'setTodoList',
				this.globalStateContainer.todoItemList.map((item) =>
					parentId === item.id ? { ...item, value: itemValue } : item,
				),
			)
		}

		let lastClick = 0
		return () => {
			input.addEventListener('click', (e) => {
				e.stopPropagation()
			})

			input.addEventListener('blur', () => changeItemValue())

			input.addEventListener('keydown', (keyPressed) => {
				if (keyPressed.key === 'Enter') {
					changeItemValue()
				}
			})

			const d = Date.now()
			const isDblClick = d - lastClick < 400 ? true : false

			label.classList[isDblClick ? 'add' : 'remove']('containerHide')
			delBtn.classList[isDblClick ? 'add' : 'remove']('delBtnHide')
			input.classList[isDblClick ? 'add' : 'remove']('itemInputVisible')

			input.focus()
			lastClick = d
		}
	}
}
export default TodoList
