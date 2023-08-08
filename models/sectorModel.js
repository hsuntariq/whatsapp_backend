const mongoose = require('mongoose');


const sectorSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,  
    },
    selectedValues: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('Sector', sectorSchema);