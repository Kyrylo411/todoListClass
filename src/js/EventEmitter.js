class EventEmitter {
	static instance
	static getInstance() {
		if (!EventEmitter.instance) {
			EventEmitter.instance = new EventEmitter()
		}
		return EventEmitter.instance
	}
	constructor() {
		this.events = {}
	}

	subscribe(eventName, fn) {
		!this.events[eventName] && (this.events[eventName] = [])

		this.events[eventName].push(fn)
	}

	unsubscribe(eventName, fn) {
		this.events[eventName] = this.events[eventName].filter(
			(eventCallback) => fn !== eventCallback,
		)
	}

	emit(eventName, data) {
		this.events[eventName].forEach((fn) => fn(data))
	}
}

export default EventEmitter
