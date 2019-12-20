//require express
require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser(process.env.SESSION_SECRECT));

const port = 3000;
const db = require('./db');
const listnameRoute = require('./routers/listname.router')
const authRoute = require('./routers/auth.route')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const authMiddleware = require('./middlewares/auth.middleware')

// set up pugjs
app.set('view engine', 'pug');
app.set('views', './views');

// localhost:3000/listname
app.get('/name' , function (req ,res) {
    res.render('index.pug',{name:"hai"});
})
app.use(express.static('public'))
// localhost:3000
app.get('/' , function (req ,res) {
    res.render('home/index.pug');
})
app.use('/listname',authMiddleware.requireAuth,listnameRoute)
app.use('/auth',authRoute)
//when run staments node index.js in terminal it will display the line is localhost:3000;
app.listen(port,function () {
    console.log(`localhost : ${port}`)
});

