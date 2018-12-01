const Book = require('./app/entity/book')

let restify = require('restify')

function books (req, res, next) {
  let b = new Book()
    .withName('greeting')
    .unread()
  res.send([b, b.withName('world'), b.readed()])
  next()
}

let server = restify.createServer()
server.get('/books', books)

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url)
})