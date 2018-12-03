/* @flow */

class Book {
  id: ?number
  name: ?string
  read: ?boolean = false

  constructor (id: ?number, name: ?string, read: ?boolean) {
    this.id = id
    this.name = name
    this.read = read
  }

  withId (id: number) {
    return new Book(id, this.name, this.read)
  }

  withName (name: string) {
    return new Book(this.id, name, this.read)
  }

  readed (read: boolean) {
    return new Book(this.id, this.name, !!read)
  }
}

module.exports = Book