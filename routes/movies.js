// router
const route = require('express').Router();
// panggil dari controller dan filenya (./controllers/todo)
const controller = require('../controller/movies');

// set route => panggil (controller.listTodo) di folder (./controllers/todo)
route.get('/', controller.listMovies)



module.exports = route;