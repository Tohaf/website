let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const admin = require('../models/admin');
const register = require('../models/register');
const parcel = require('../models/parcel');





router.get('/', (req, res) => {

    res.render('admin', {admin: new admin()});

});

router.get('/location', async(req, res) => {

    let searchOptions = {};

    if(req.query.location != null && req.query.location !== '' ){

        searchOptions.location = new RegExp(req.query.location, 'i');
    }

    try{
        const parcels = await  parcel.find(searchOptions);
        res.render('admin/location', {
        parcels: parcels,
        searchOptions: req.query
    });
 
    }catch{
        res.redirect('parcel');
 
    }
    

});

router.get('/location/:id', async(req, res) => {

    try{ 
        const parcels = await parcel.findById(req.params.id);
        
        res.render('admin/locate', {parcel: parcels});

    }catch{

        res.redirect('/parcel');
      
    }

    
});


router.put('/location/:id', async(req,res) => {

    let parcels

    try{

        parcels = await parcel.findById(req.params.id);
        parcels.location = req.body.location;
        await parcels.save()
        res.redirect('/parcel/search');
        

    }catch{
        res.render('index');
    }
    
});

router.get('/status/:id', async(req, res) => {

    try{ 
        const parcels = await parcel.findById(req.params.id);
        
        res.render('admin/status', {parcel: parcels});

    }catch{

        res.redirect('/parcel');
      
    }

});


router.put('/status/:id', async(req,res) => {

    let parcels

    try{

        parcels = await parcel.findById(req.params.id);
        parcels.status = req.body.status;
        await parcels.save()
        res.redirect('/parcel/search');
        

    }catch{
        res.render('index');
    }
})

router.post('/', (req, res) => {


    var password = req.body.password;
    var username = req.body.username;

    if(password = "tohaf7117" && username == "Tohaf"){

        res.render('admin/welcome');
    }else{

        res.send('error in login');
    }

});


router.delete('delete', (req, res) => {

    res.send('deleted');
});





module.exports = router;