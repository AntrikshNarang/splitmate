const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const Transaction = require('../Models/Transaction')
const fetchuser = require('../middleware/fetchuser');

router.post('/createtransaction', fetchuser , async (req, res) => {
    console.log(req.body);
    //If an Error is Found, return bad Request
    //Check whether email exists already
    try {
        let {name, description, amount, category} = req.body;
        let transaction = await Transaction.create({
            name: name,
            description: description,
            amount: amount,
            creator: req.user.id,
            category: category
        });
        success=true;
        return res.status(200).json({success, transaction});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:  false, error: 'Internal Server Error'});
    }
})


router.get('/gettransactions', fetchuser , async (req, res) => {
    console.log(req.body);
    //If an Error is Found, return bad Request
    //Check whether email exists already
    try {
        let transactions = await Transaction.find({creator: req.user.id}); 
        success=true;
        return res.status(200).json({success, transactions});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:  false, error: 'Internal Server Error'});
    }
})


router.post('/splittransaction/:id', fetchuser, async(req, res) => {
    try {
        let transactionId = req.params.id;
        let friends = req.body.friends;
        let amounts = req.body.amounts;
        let transaction = await Transaction.findById(transactionId);
        if(!transaction){
            return res.status(404).json({success: false, error: "Transaction not found"});
        }
        console.log(transaction)
        if(transaction.payers.length > 0){
            return res.status(303).json({success: false, error: "Transaction is already splitted"});
        }
        let splitters = [];
        await Promise.all(friends.map(async (friend, index) =>{
            try{
                let user = await User.findById(friend);
                await User.findByIdAndUpdate(friend, {pendingTransactions: [...user.pendingTransactions, {id: transactionId, amount: amounts[index]}]});
                splitters.push({id: friend, amount: amounts[index]});
            } catch(err){
                console.log(`Cannot split transaction for ${friend}`)
                console.log(err.message) 
            }
        }))
        transaction = await Transaction.findByIdAndUpdate(transactionId, {payers: splitters});
        console.log("Transaction splitted successfully")
        return res.status(200).json({success: true})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:  false, error: 'Internal Server Error'});
    }
})

router.post('/paymoney/:id', fetchuser, async(req, res) => {
    try {
        let transactionId = req.params.id;
        let transaction = await Transaction.findById(transactionId);
        let user = await User.findById(req.user.id);
        let amountToPay = null;
        for(tr of user.pendingTransactions){
            console.log(tr)
            if(tr.id == transactionId){
                amountToPay = tr.amount;
                break;
            }
        }
        if(amountToPay == null) return res.status(300).json({success: false, error: "Transaction made already"});
        user = await User.findByIdAndUpdate(req.user.id, { pendingTransactions: user.pendingTransactions.filter((tr) => tr.id != transactionId )});

        let {name, description, category, creator} = transaction;
        // Transaction by user - pay money
        transaction = await Transaction.create({
            name: "SPLIT TRANSACTION: " + name,
            description: "TRANSACTION SPLITTED FOR : " + description,
            amount: amountToPay * -1,
            creator: req.user.id,
            category: category
        });
        // Transaction in receiver's account
        let realOwner = await User.findById(creator);
        realOwner = await User.findByIdAndUpdate(creator, {messages: [...realOwner.messages, `${user.name} paid you ${amountToPay}` ]});
        let transaction2 = await Transaction.create({
            name: `SPLIT TRANSACTION Money paid by (${realOwner.name}) : ` + name,
            description: "TRANSACTION SPLITTED FOR : " + description,
            amount: amountToPay,
            creator: creator,
            category: category
        })
        return res.status(200).json({success: true, transaction, transaction2}); 
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:  false, error: 'Internal Server Error'});
    }
})



module.exports = router;