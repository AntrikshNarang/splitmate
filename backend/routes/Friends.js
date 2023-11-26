const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const fetchuser = require('../middleware/fetchuser');

router.post('/addFriend/:id', fetchuser , async (req, res) => {
    console.log(req.body);
    //If an Error is Found, return bad Request
    const friendId = req.params.id;
    //Check whether email exists already
    try {
        let success = false;
        let user = await User.findById(req.user.id);
        if(user.friends.findIndex((id) => friendId == id) != -1){
            return res.status(400).json({success, error: 'User is already your friend'});
        }
        let friend = await User.findOne({ _id: friendId });
        if (!friend) {
            return res.status(400).json({success, error: 'User Not Found on DB' })
        }
        if(friend.pendingRequests.findIndex((id) => id == req.user.id) !== -1){
            return res.status(400).json({success, error: 'A request is already sent to the user'});
        }
        friend = await User.findByIdAndUpdate(friendId, {pendingRequests: [...friend.pendingRequests, req.user.id]});
        
        console.log(friend)
        success=true;
        res.status(200).json({success, friend});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})


router.post('/acceptfriend/:id', fetchuser , async (req, res) => {
    console.log(req.body);
    //If an Error is Found, return bad Request
    const friendId = req.params.id;
    //Check whether email exists already
    try {
        let success = false;
        let friend = await User.findOne({ _id: friendId });
        if (!friend) {
            return res.status(400).json({success, error: 'User Not Found on DB' })
        }
        
        let currentUser = await User.findById(req.user.id);
        if(currentUser.friends.findIndex((id) => id == friendId) !== -1){
            return res.status(400).json({success, error: 'User is already a friend'});
        }
        friend = await User.findByIdAndUpdate(friendId, {friends: [...friend.friends, req.user.id]});
        currentUser = await User.findByIdAndUpdate(req.user.id, {pendingRequests: currentUser.pendingRequests.filter((prId) => prId != friendId), friends: [...currentUser.friends, friendId]});
        success=true;
        res.status(200).json({success, currentUser, friend});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})

router.get('/getfriends', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        let user = await User.findById(userId);
        let friendList = [];
        await Promise.all(user.friends.map(async (friendId) =>{
            try{
                let friend = await User.findById(friendId);
                friendList.push({id: friendId, name: friend.name});
            } catch(err){
                console.log(`Cannot find friend with id ${friend}`)
                console.log(err.message) 
            }
        }))
        return res.status(200).json({success: true, friendList});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})

router.get('/getfriendrequests', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        let user = await User.findById(userId);
        let friendList = [];
        await Promise.all(user.pendingRequests.map(async (friendId) =>{
            try{
                let friend = await User.findById(friendId);
                friendList.push({id: friendId, name: friend.name});
            } catch(err){
                console.log(`Cannot find friend with id ${friend}`)
                console.log(err.message) 
            }
        }))
        return res.status(200).json({success: true, friendList});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})

router.get('/search/:query', fetchuser, async (req, res) => {
    try {
        let searchQuery = req.params.query;
        let results = await User.find({$text: {$search: searchQuery}});
        results = results.map((result) => ({name: result.name, email: result.email, id: result._id}))
        return res.status(200).json({success: true, results});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})



module.exports = router;