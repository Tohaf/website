let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const register = require('../models/register');





router.get('/', (req, res) => {

    res.render('user/Register', {register: new register()});

});


router.post('/', async(req, res) => {

    var Firstname = req.body.Firstname;
    var Lastname = req.body.Lastname;
    var password = req.body.password;
    var email = req.body.email;
    var username = req.body.username;

    var newRegister = new register();

    newRegister.Firstname = Firstname;
    newRegister.Lastname = Lastname;
    newRegister.password = password;
    newRegister.email = email;
    newRegister.username = username;

    newRegister.save((err, saveRegister)=>{
        if(err){
            
            res.status(500).send();
        }

        res.render('user/login');
    });

});


router.get('/login', (req, res) => {

    res.render('user/login',  {register: new register()});

});

router.post('/login', (req, res) => {
    var password = req.body.password;
    var email = req.body.email;

    register.findOne({email: email, password: password}, (err, register)=> {
        if(err){
            console.log(err);
            
        }
        if(!register){
            return res.status(404).send();
        }

        res.redirect('/parcel');
    });


    
});









module.exports = router;