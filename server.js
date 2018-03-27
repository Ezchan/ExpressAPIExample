var todos = require('./todos.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.post('/todos', function (request, response) {
  var count = Object.keys(todos).length + 1
  todos[count] = {
    text: request.body.text.trim(),
    completed: 'false'
  }
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such todo: ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})

app.put('/todos/:id', function (request, response) {
  var todo = todos[request.params.id]
  if (request.body.text !== undefined) {
    todo.text = request.body.text.trim()
  }
  if (request.body.completed !== undefined) {
    todo.completed = request.body.completed.trim()
  }
  response.json(todos)
})

app.delete('/todos/:id', function (request, response) {
  delete todos[request.params.id]
  response.json(todos)
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)
