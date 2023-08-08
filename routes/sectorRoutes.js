const express = require('express');
const { postSector, getSectors } = require('../controller/addSector');
const router = express.Router();

router.post('/post-sector',postSector)
router.get('/get-sector',getSectors)


module.exports = router;