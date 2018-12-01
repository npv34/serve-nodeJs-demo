'use strict'

const BookService = require('./app/service/book-service')
const Book = require('./app/entity/book')
const restify = require('restify')

let log = console.log
let bookService = new BookService()

function parseBook (req, res, next) {
  if (!req.body) return next(new Error('couldnt parse book from request!'))

  let book = new Book()
  if (req.body.id !== undefined) book.id = Number(req.body.id)
  if (req.body.name !== undefined) book.name = req.body.name
  if (req.body.read !== undefined) book.read = req.body.read === 'true'
  req.book = book
  return next()
}

function hasId (req, res, next) {
  if (!req.book) return next(new Error('couldnt get book from request!'))
  if (isNil(req.book.id)) return next(new Error('lack of id!'))
  return next()

  function isNil (value) {
    return value == null
  }
}

function all (req, res, next) {
  res.send(bookService.getAll())
  return next()
}

function one (req, res, next) {
  let id = Number(req.params.id)
  res.send(bookService.get(id))
  return next()
}

function add (req, res, next) {
  res.send(bookService.add(req.book))
  return next()
}

function update (req, res, next) {
  res.send(bookService.update(req.book))
  return next()
}

function patch (req, res, next) {
  res.send(bookService.patch(req.book))
  return next()
}

let server = restify.createServer()
server.use(restify.plugins.queryParser())
server.use(restify.plugins.jsonp())
server.use(restify.plugins.bodyParser())
server.get('/books', all)
server.get('/books/:id', one)
server.post('/books', parseBook, add)
server.put('/books', parseBook, hasId, update)
server.patch('/books', parseBook, hasId, patch)

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url)
})