const route = require('express').Router();
// pemanggilan route todo di folder routes
const moviesRoute = require('./movies')

route.use('/movies', moviesRoute);

module.exports = route;