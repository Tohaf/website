const mongoose = require ('mongoose');

const loginSchema = new mongoose.Schema({

    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    }
    
});



module.exports = mongoose.model('login', loginSchema);
