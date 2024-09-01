const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const { jwt_password } = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const response = await Admin.findOne({
        username : username
    });

    if(response){
        return res.json("Admin already exists.")
    }
    else{
        await Admin.create({
            username : username,
            password : password
        });
        res.json("Admin created successfully.")
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.findOne({
        username : username,
        password : password
    });
    if(user){
        const token = jwt.sign({username}, jwt_password);
        res.json({
            token : token
        });
    }
    else{
        res.json("Incorrect username or password.");
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const link = req.body.imageLink;
    const response = await Course.findOne({
        title : title
    });

    if(response){
        res.json("Course already exists.")
    }
    else{
        await Course.create({
            title : title,
            description : desc,
            price : price,
            imageLink : link
        });
        res.json("Course created successfully");
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        Courses : courses
    });
});

module.exports = router;