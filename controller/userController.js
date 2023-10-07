const AsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const cron = require('node-cron');

const register = AsyncHandler(async (req, res) => {
    const {username,phone,password,photo} = req.body;
    if (!username || !phone || !password || !photo) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const checkUser = await User.findOne({ phone });
    if (!checkUser) {
        const newUser = await User.create({
            username,phone,password:hashedPassword,photo
        })
        // store the user in the session
        req.session.user = newUser;
        // console.log(req.session.user);
        res.json(newUser)
    } else {
        res.status(400);
        throw new Error('Phone number already registered');
    }

})

// get the user from the session

const getUserSession = AsyncHandler(async(req,res)=>{
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        throw new Error('Not Authorized');
    }
})


const getAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users)
})

const addStatus = AsyncHandler(async (req, res) => {
    const { status } = req.body;
    const user = await User.findById(req.params.id);
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US').format(currentDate);
    
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = currentDate.toLocaleString('en-US', options);

    const statusEntry = {
        index: user.statusContent.length + 1, // Auto-incrementing index
        status,
        statusUpdatedAt: {
            currentDay: currentDate.getDay(),
            currentDate: formattedDate,
            formattedTime: formattedTime,
        }
    };

    user.statusContent.push(statusEntry);

    if (user.statusContent.length > 0) {
        user.status = true;
    } else {
        user.status = false;
    }


    const updatedContent = await user.save();

    res.send(updatedContent);
});


// auto schedule the api call to the server

cron.schedule('0 0 * * *', async () => {
    try {
        const users = await User.find();

        for (const user of users) {
            const currentDate = new Date();
            const twentyFourHoursAgo = new Date(currentDate);
            twentyFourHoursAgo.setHours(currentDate.getHours() - 24);

            user.statusContent = user.statusContent.filter(entry => {
                const entryDate = new Date(entry.statusUpdatedAt.currentDate + ' ' + entry.statusUpdatedAt.formattedTime);
                return entryDate >= twentyFourHoursAgo;
            });

            if (user.statusContent.length === 0) {
                user.status = false;
            }

            user.markModified('status');
            user.markModified('statusContent');
            await user.save();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


// get the statuses

const getStatuses = AsyncHandler(async (req, res) => {
    const status = await User.find({status:true});
    // const statuses = status.map((userStatus) => {
    //     return userStatus.statusContent
    // })
    res.send(status);
})





module.exports = {
    register,
    getAllUsers,
    addStatus,
    getStatuses,
    getUserSession
}