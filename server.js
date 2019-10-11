const express = require("express");
const path = require("path");

var exphbs = require("express-handlebars");

const routes = require('./controllers/index.js');


// 
const app = express();
const PORT = process.env.PORT || 3000;


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


app.listen(PORT, () => {
    console.log('App listening on port 3000');
});