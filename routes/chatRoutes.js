const express = require('express');
const { addChat, addMessage } = require('../controller/chatController');
const router = express.Router();


router.post('/add-chat', addChat);
router.post('/add-message', addMessage);


module.exports = router