const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true,'Please enter username']
    },
    phone: {
        type: String,
        required:[true,'Please enter Phone number']
    },
    password: {
        type: String,
        required:[true,'Please enter password']
    },
    photo: {
        type: String,
        required:[true,'Please add a photo']
    },
    status: {
        type: Boolean,
        default:false,
    },
    statusContent: {
        type: Array,
        default:[],
        timestamps:true
    }
})

module.exports = mongoose.model('User', userSchema);