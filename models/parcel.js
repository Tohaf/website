const mongoose = require ('mongoose');

const parcelSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },
    
    Description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },
    
    location: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    }

    
});



module.exports = mongoose.model('parcel', parcelSchema);
