const AsyncHandler = require('express-async-handler');
const Sector = require('../models/sectorModel');


const postSector = AsyncHandler(async (req, res) => {
    const {
        name,selectedValues
    } = req.body;
    if(!name || !selectedValues){
        throw new Error('Respective Field is Required');
    }
    const sectors = await Sector.create({
        name,selectedValues
    });
    res.status(200).json(sectors)

});

const getSectors = AsyncHandler(async (req, res) => {
    const sectors = await Sector.find()
    res.json(sectors);
})

module.exports = {
    postSector,
    getSectors
}