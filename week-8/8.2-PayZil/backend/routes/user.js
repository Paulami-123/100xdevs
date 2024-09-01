const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const generateColor = require("../colors");

const router = express.Router();

const Inputs = ['Email ID', 'First name', 'Last name', 'Password']

function field(name){
    if(name==='email'){
        return Inputs[0];
    }
    else if(name==='firstName'){
        return Inputs[1];
    }
    else if(name==='lastName'){
        return Inputs[2]
    }
    else if(name==='password'){
        return Inputs[3]
    }
    else{
        return 'Invalid credentials'
    }
}

function setErrorMsg(issues){
    let msg = '';
    if(issues.message==='Required'){
        msg += 'is required'
    }
    else if(issues.code.startsWith("invalid")){
        msg += 'is invalid'
    }
    else if(issues.code==="too_small"){
        msg += 'is too short'
    }
    else if(issues.code==="too_big"){
        msg += 'is too long'
    }
    return msg;
}

const signUpSchema = zod.object({
    email : zod.string().min(3).max(30).email(),
    firstName : zod.string().min(2).max(30),
    lastName : zod.string().max(50).optional(),
    password : zod.string().min(7)
});


router.post("/signup", async(req, res)=>{
    const response = signUpSchema.safeParse(req.body);
    
    if(!response.success){
        const issues = response.error.issues[0];
        let errorMsg = field(issues.path[0])
        if(errorMsg!=="Invalid credentials"){
            errorMsg += ' ' + setErrorMsg(issues)
        }
        return res.status(400).json({
            message : errorMsg
            // err : response.error.issues[0]
        });
    }

    else{
        const { email, password, firstName, lastName } = req.body;
        const existingUser = await User.findOne({
            email : email
        });

        if(existingUser){
            return res.status(403).json({
                message : "Email already exists"
            });
        }
        else{
            try{
                const color = generateColor();
                const user = await User.create({
                    email : email,
                    password : password,
                    firstName : firstName,
                    lastName : lastName,
                    color : color
                });
            
                const userId = user._id;
            
                await Account.create({
                    userId : userId,
                    balance : Math.round(Math.random()*Math.pow(10, 6))
                })
            
                const token = jwt.sign({email, userId}, JWT_Secret);
                return res.json({
                    message : "User accounted created",
                    token : token,
                    userId : userId
                });
            }
            catch(err){
                return res.status(403).json({
                    message : "Error while signing up"
                })
            }
        }
    }
});

const signinSchema = zod.object({
    email : zod.string().min(3).max(30).email(),
    password : zod.string().min(7)
});

router.post("/signin", async(req, res)=>{
    const response = signinSchema.safeParse(req.body);
    if(!response.success){
        const issues = response.error.issues[0];
        let errorMsg = field(issues.path[0])
        if(errorMsg!=="Invalid credentials"){
            errorMsg += ' ' + setErrorMsg(issues)
        }
        return res.status(400).json({
            message : errorMsg
        });
    }
    else{
        const { email, password } = req.body;

        const existingUser = await User.findOne({
            email : email
        });
        if(!existingUser){
            return res.status(404).json({
                message : "Email does not exist"
            });
        }
        else if(existingUser.password!==password){
            return res.status(403).json({
                message : "Incorrect Password"
            });
        }
        else{
            const userId = existingUser._id;
            const token = jwt.sign({email, userId}, JWT_Secret);
            return res.json({
                message : "Sign in successful.",
                token : token,
                userId : userId,
                firstName : existingUser.firstName
            });
        }
    }
}
);

const updateSchema = zod.object({
    password : zod.string().min(7).or(zod.string().optional()),
    firstName : zod.string().min(3).max(30).or(zod.string().optional()),
    lastName : zod.string().max(50).or(zod.string().optional())
});

router.put("/update", authMiddleware, async(req, res)=>{
    const response = updateSchema.safeParse(req.body);
    if(!response.success){
        const issues = response.error.issues[0];
        let errorMsg = field(issues.path[0])
        if(errorMsg!=="Invalid credentials"){
            errorMsg += ' ' + setErrorMsg(issues)
        }
        return res.status(400).json({
            message : errorMsg
        });
    }
    else{
        try{
            const response = await User.updateOne({
                _id : req.userId
            }, {
                firstName : (req.body.firstName!==null && req.body.firstName!=="") ? req.body.firstName : undefined,
                lastName : (req.body.lastName!==null) ? req.body.lastName : undefined,
                password : (req.body.password!==null && req.body.password!=="") ? req.body.password : undefined,
            });
            
            return res.json({
                message : "User information updated.",
                response : response
            });
        }
        catch(err){
            console.log(err)
            return res.status(403).json({
                message : "Error while updating information"
            })
        }
    }
});

router.get("/bulk", async(req, res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        "$or" : [{
            firstName : {
                "$regex" : filter
              }
            },{
            lastName : {
                "$regex" : filter
              }
        }]
    });

    return res.json({
        Users: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            color : user.color,
            _id: user._id
        }))
    });
});

router.get("/data", authMiddleware, async(req, res)=>{
    const user = await User.findOne({
        _id : req.userId
    }).select("color");

    const account = await Account.findOne({
        userId : req.userId
    });

    const userData = {
        color : user.color,
        balance : account.balance
    };
    
    return res.json({
        user : userData
    });
})

module.exports = router;