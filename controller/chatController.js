const AsyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const { v4: uuidv4 } = require('uuid');

const addChat = AsyncHandler(async (req,res) => {
    const { sender_id, receiver_id } = req.body;
    const chatExists = await Chat.findOne({
            users: { $all: [sender_id, receiver_id] }
});


    if (!sender_id || !receiver_id) {
        res.status(400)
        throw new Error('Credentials not found')
    }
    else if (!chatExists) {
        const newChat = await Chat.create({
            users:[sender_id,receiver_id],chat:[],
        })
        res.send(newChat)
    } else {
        res.send(chatExists);
    }
})

const addMessage = AsyncHandler(async(req,res)=>{
    const { message,sender_id,receiver_id } = req.body;
    if (!message) {
        throw new Error('Please input a message');
    }
    const findChat = await Chat.findOne({
        users: { $all: [receiver_id, sender_id] }
    });

    // genrate id
    const messageId = uuidv4()

    // format the time
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${amPm}`;
    }

    if (findChat) {
        const currentTime = new Date();
        const time = formatTime(currentTime);
        findChat.chat.push({_id:messageId,message,sender_id,time});
        await findChat.save();
        res.send(findChat);
    }
})


module.exports = {
    addChat,addMessage
}