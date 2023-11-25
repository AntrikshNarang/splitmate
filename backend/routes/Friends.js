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
        let friend = await User.findOne({ _id: friendId });
        if (!friend) {
            return res.status(400).json({success, error: 'User Not Found on DB' })
        }
        
        friend = await User.findByIdAndUpdate(friendId, {pendingRequests: [...friend.pendingRequests, req.user.id]});
    
        success=true;
        res.status(200).json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
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
        
        friend = await User.findByIdAndUpdate(friendId, {friends: [...friend.friends, req.user.id]});
        let currentUser = await User.findById(req.user.id);
        currentUser = await User.findByIdAndUpdate(req.user.id, {pendingRequests: currentUser.pendingRequests.filter((req) => req.id != friendId)});
        success=true;
        res.status(200).json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})



//ROUTE 2: Authenticate a User with login credentials using: POST "/api/auth/login". Doesn't require login
router.post('/login', [
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    console.log(req.body);
    let success = false;
    //If an Error is Found, return bad Request
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()[0].msg });
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error:'Please try to login with correct credentials'})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:'Please try to login with correct credentials'})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        console.log('user login successsful')
        res.status(200).json({success, authToken});
          
    } catch(error){
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;