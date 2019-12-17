const express = require('express');
const app = express();
const port = 3000;
const names = [
    {id : "1" , name : "Le Tuan Hai"},
    {id : "2" , name : "Nguyen Duc Trung"},
    {id : "3" , name : "Ha Cong Tung"},
    {id : "4" , name : "Le Van Thinh"},
    {id : "6" , name : "Tuan Anh"},
    {id : "7" , name : "Trinh Van Bac"},
    {id : "8" , name : "Trinh Tien Thuan"},
    {id : "9" , name : "Quynh Anh"},
    {id : "10" , name : "Hoang Linh"},
    {id : "11" , name : "Le Tuan Chung"},
    {id : "12" , name : "Hoang Thi Thanh"},
    {id : "13" , name : "Le Van Dung"},
    {id : "14" , name : "Trinh Thi Hanh"}
];
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/name' , function (req ,res) {
    res.render('index.pug',{name:"hai"});
})
app.get('/' , function (req ,res) {
    res.render('home/index.pug');
})
app.get('/listname', (req ,res) => {
    res.render('listname',{
        names : names 
    })
})
app.get('/listname/search', (req ,res ) => {
    let q = req.query.q;
    let filterNames = names.filter( (name) => {
        return name.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }) 
    res.render('listname',{
        names:filterNames
    })
})
app.listen(port,function () {
    console.log(`localhost : ${port}`)
});