const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");
const { jwt_password } = require("../config");

function getUser(auth){
    const words = auth.split(" ");
    const token = words[1];
    const response = jwt.verify(token, jwt_password);
    return response.username;
}

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const response = await User.findOne({
        username : username
    });

    if(response){
        res.json("User already exists.")
    }
    else{
        await User.create({
            username : username,
            password : password
        });
        res.json("User created successfully.")
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username : username,
        password : password
    });
    if(user){
        const token = jwt.sign({username}, jwt_password);
        res.json({
            Token : token
        });
    }
    else{
        res.json("Incorrect username or password.")
    }
});

router.get('/courses', userMiddleware, async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        Courses : courses
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = getUser(req.headers.authorization);
    await User.updateOne({
        username : username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    });
    res.json("Course purchased successfully.");
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = getUser(req.headers.authorization);
    const user = await User.findOne({
        username : username
    });
    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    });
    res.json({
        Purchased_Courses : courses
    });
});

module.exports = router