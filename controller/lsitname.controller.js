const db = require('../db');
const shortid = require('shortid')

module.exports.index = (req ,res) => {
    res.render('listname',{
        names : db.get('names').value()
    })
}
module.exports.create = (req , res) => {
    res.render('home/create');
}
module.exports.search = (req ,res ) => {
    let q = req.query.q;
    let filterNames = db.get('names').value().filter( (name) => {
        return name.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }) 
    res.render('listname',{
        names:filterNames
    })
}
module.exports.view = (req , res) => {
    let id = (req.params.id);
    let name = db.get('names').find( { id: id }).value() 
    res.render('home/view',{
        name:name
    })
}
module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate()
    if(req.body.name && req.body.phone)
    {
        db.get('names').push(req.body).write();
        res.redirect('/listname');
    }
  }