let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const parcel = require('../models/parcel');






router.get('/search', async (req, res)=> {

    let searchOptions = {};

    if(req.query.username != null && req.query.username !== '' ){

        searchOptions.username = new RegExp(req.query.username, 'i');
    }

    try{
        const parcels = await  parcel.find(searchOptions);
        res.render('parcel/search', {
        parcels: parcels,
        searchOptions: req.query
    });
 
    }catch{
        res.redirect('parcel');
 
    }
    
});


router.get('/', (req, res)=> {
    res.render('parcel', {parcel: new parcel()});
});




router.post('/', async(req, res) => {
    
    var Firstname = req.body.Firstname;
    var username = req.body.username;
    var Description = req.body.Description;
    var destination = req.body.destination;
    var location = req.body.location;
    var status = req.body.status;

    var newParcel = new parcel();

    newParcel.Firstname = Firstname;
    newParcel.Description = Description;
    newParcel.username = username;
    newParcel.destination = destination;
    newParcel.location = location;
    newParcel.status = status;

    try{
        await newParcel.save();

        res.redirect('parcel/search' );
        

    }catch{
        res.render('index');
    }

   
});

router.get('/search/:id', (req, res)=> {
    res.send('show order ' + req.params.id);
});



router.get('/search/:id/edit', async(req, res)=> {

    try{ 
        const parcels = await parcel.findById(req.params.id);
        
        res.render('parcel/edit', {parcel: parcels});

    }catch{

        res.redirect('/parcel');
      
    }

   
});



router.put('/search/:id', async (req, res)=> {

    let parcels

    try{

        parcels = await parcel.findById(req.params.id);
        parcels.destination = req.body.destination;
        await parcels.save()
        res.redirect('/parcel/search');
        

    }catch{
        res.render('index');
    }


   
});

router.delete('/search/:id', async(req, res)=> {
    let parcels

    try{

        parcels = await parcel.findById(req.params.id);
        parcels.username = req.body.username;
        await parcels.remove()
        res.send('seccusfully deleted');
        

    }catch{
        res.render('index');
    }
});






/*
router.post('/', async(req, res)=> {
    var Firstname = req.body.Firstname;
    var username = req.body.username;
    var Description = req.body.Description;

    var newParcel = new parcel();

    newParcel.Firstname = Firstname;
    newParcel.Description = Description;
    newParcel.username = username;

    newParcel.save((err, saveParcel)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }

        res.send('parcel succesfully created');
    });

});

*/










module.exports = router;