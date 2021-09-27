let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const login = require('../models/login');
const register = require('../models/register');



router.get('/', (req, res) => {

    res.render('login',  {login: new login()});

});

router.post('/', (req, res) => {
    var password = req.body.password;
    var email = req.body.email;

    register.findOne({email: email, password: password}, (err, register)=> {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!register){
            return res.status(404).send();
        }

        res.redirect('parcel');
    });


    
});








module.exports = router;