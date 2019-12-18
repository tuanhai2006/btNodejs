//require express
const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid')

db.defaults({ names: []})
  .write()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// set up pugjs
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/name' , function (req ,res) {
    res.render('index.pug',{name:"hai"});
})
// localhost:3000
app.get('/' , function (req ,res) {
    res.render('home/index.pug');
})
// localhost:3000/listname
app.get('/listname', (req ,res) => {
    res.render('listname',{
        names : db.get('names').value()
    })
})
//create a way is plus  listname and create
app.get('/listname/create',(req , res) => {
    res.render('home/create');
})
//create a new name
app.post('/listname/create', function (req, res) {
    req.body.id = shortid.generate()
    db.get('names')
        .push(req.body)
        .write()
    res.redirect('/listname');
  })
//the way to remove
app.get('/listname/remove', (req , res ) => {
    res.render('home/remove')
})

// when  fill input and click check to find the names you want
app.get('/listname/search', (req ,res ) => {
    let q = req.query.q;
    let filterNames = ( db.get('names')).filter( (name) => {
        return name.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }) 
    console.log(filterNames)
    res.render('listname',{
        names:filterNames
    })
})
//page to view a name of listname page
app.get('/listname/:id', (req , res) => {
    let id = (req.params.id);
    let name = db.get('names').find( { id: id }).value()
    console.log(name);
    
    res.render('home/view',{
        name:name
    })
})
//when run staments node index.js in terminal it will display the line is localhost:3000;
app.listen(port,function () {
    console.log(`localhost : ${port}`)
});

