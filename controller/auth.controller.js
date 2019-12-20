const db = require('../db');
const md5 = require('md5');
module.exports.login = function (req, res, next) {
    res.render('auth/login')
}
module.exports.postLogin = function (req, res ,next) {
    let email = req.body.email;
    let pass = req.body.pass;
    let user =  db.get('names').find({email : email}).value();
    if(!user){
        res.render('auth/login', {
            errors:[
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }
    let hasedPass = md5(pass);
    if(user.pass !== hasedPass){
        res.render('auth/login', {
            errors:[
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId',user.id,{
        signed: true
    });
    res.redirect('/listname')

}