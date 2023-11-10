const express = require('express');
const app = express();

const usersRoute = require('./routes/users');
const showsRoute = require('./routes/shows');

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', usersRoute);
app.use('/shows', showsRoute);

module.exports = app;