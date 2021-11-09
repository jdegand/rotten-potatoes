const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const methodOverride = require('method-override');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

const mongoDb = "MONGO CONNECTION STRING W/ USERNAME PASSWORD DATABASE GOES HERE";

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true }); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
})

module.exports = app;