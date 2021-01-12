enum PRIORITY {
  INTERACTION = 50,
  HIGH = 25,
  NORMAL = 0,
  LOW = -25,
  UTILITY = -50,
}

export default class Ticker {
  static PRIORITY = PRIORITY

  head: Task
  last: Task

  constructor() {

  }

  add(fn: Function, ctx?: any, priority: PRIORITY = PRIORITY.NORMAL) {
    const task = new Task(fn, ctx, priority)
    if (this.last) this.last.connect(task, this)
    else this.head = this.last = task
  }

  addOnce(fn: Function, ctx?: any, priority: PRIORITY = PRIORITY.NORMAL) {
    const task = new Task(fn, ctx, priority, true)
    if (this.last) this.last.connect(task, this)
    else this.head = this.last = task
  }

  remove(fn: Function) {
    const current = this.head

    while (current) {
      if (current.fn === fn) {
        current.destroy(this)
      }
    }
  }

  update() {
    let current = this.head
    while (current) {
      current.fn.call(current.ctx)
      if (current.once) current = current.destroy(this)
      else current = current.next
    }
  }
}

class Task {
  next: this
  prev: this
  priority: PRIORITY
  fn: Function
  ctx: any
  once: boolean

  constructor(fn: Function, ctx?: any, priority?: PRIORITY, once = false) {
    this.fn = fn
    this.ctx = ctx
    this.once = once
    this.priority = priority
  }

  connect(task: this, ticker: Ticker) {
    if (task.priority > this.priority) {
      if (this.prev) this.prev.connect(task, ticker)
      else task.connect(this, ticker)
    } else {
      // if (task.priority === PRIORITY.UTILITY) debugger
      const {next} = this
      this.next = task
      task.prev = this
      !this.prev && (ticker.head = this)
      next && task.connect(next, ticker)
      ticker.last === this && (ticker.last = task)
    }
  }

  destroy(ticker: Ticker) {
    const {prev, next} = this

    if (prev && next) prev.connect(next, ticker)
    else if (prev) {
      prev.next = null
      ticker.last = prev
    } else if (next) {
      next.prev = null
      ticker.head = next
    }

    this.fn =
    this.ctx =
    this.prev =
    this.next =
    this.once =
    this.priority = null

    return next
  }
}
