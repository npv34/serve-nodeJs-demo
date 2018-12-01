'use strict'

class Book {
  constructor (id, name = '', read = false) {
    this.id = id
    this.name = name
    this.read = read
  }

  withId (id) {
    return new Book(id, this.name, this.read)
  }

  withName (name) {
    return new Book(this.id, name, this.read)
  }

  unread () {
    return new Book(this.id, this.name, false)
  }

  readed () {
    return new Book(this.id, this.name, true)
  }
}

module.exports = Book