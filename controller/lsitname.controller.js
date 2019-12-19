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
    console.log(filterNames)
    res.render('listname',{
        names:filterNames
    })
}
module.exports.view = (req , res) => {
    let id = (req.params.id);
    let name = db.get('names').find( { id: id }).value()
    console.log(name);
    
    res.render('home/view',{
        name:name
    })
}
module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate()
    let errors = [];
    if(!req.body.name){
        errors.push('Name is required');
    }
    if(!req.body.phone){
        errors.push('Phone is required');
    }
    if(errors.length){
        res.render('home/create',{
            errors: errors,
            values: req.body
        });
    }
    if(req.body.name && req.body.phone)
    db.get('names').push(req.body).write();
    res.redirect('/listname');
  }