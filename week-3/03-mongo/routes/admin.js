const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
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
        return res.json("Admin already exists.");
    }
    else{
        await Admin.create({
            username : username,
            password : password
        });
        res.json("Admin created successfully.")
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const newCourse = await Course.create({
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        imageLink : req.body.imageLink
    });
    res.json({
        message : "Course created successfully", Course_Id : newCourse._id
    });
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        Courses : courses
    });
});

module.exports = router;