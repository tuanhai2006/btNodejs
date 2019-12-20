const db = require('../db');
module.exports.login = function (req, res, next) {
    res.render('auth/login')
}
module.exports.postLogin = function (req, res ,next) {
    let email = req.body.email;
    console.log(email);
    let pass = req.body.pass;
    let user =  db.get('names').find({email : email}).value();
    console.log(user)
    if(!user){
        res.render('auth/login', {
            errors:[
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }
    if(user.pass !== pass){
        res.render('auth/login', {
            errors:[
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId',user.id);
    res.redirect('/listname')

}