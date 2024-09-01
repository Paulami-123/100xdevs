const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async(req, res)=>{
    try{
        const account = await Account.findOne({
            userId : req.userId
        });
    
        return res.status(200).json({
            balance : account.balance
        });
    }
    catch(err){
        return res.status(403).json({
            message : "Error while fetching balance"
        })
    }
});

router.post("/transfer", authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const {amount, to} = req.body;

    const fromAccount = await Account.findOne({
        userId : req.userId
    }).session(session);

    if(!fromAccount || fromAccount.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            error : "Insufficient balance."
        });
    }
    else{
        const toAccount = await Account.findOne({
            userId : to
        }).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(404).json({
                message : "Recipient's account does not exist."
            });
        }
        else{
            await Account.updateOne({
                userId : req.userId,
            },{
                "$inc" : {
                    balance : -amount
                }
            }).session(session);

            await Account.updateOne({
                userId : to
            },{
                "$inc" : {
                    balance : amount
                }
            }).session(session);

            await session.commitTransaction();
            return res.status(200).json({
                message : "Transfer successful."
            });
        }
    }
});


module.exports = router;