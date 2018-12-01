let restify = require('restify');

function respond(req, res, next) {
    res.send('hello');
    next();
}

let server = restify.createServer();
server.get('/books', respond);

server.listen(8081, function() {
    console.log('%s listening at %s', server.name, server.url);
});