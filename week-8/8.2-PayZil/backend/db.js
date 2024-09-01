const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://paulamibanerjee:J0pudtb2fKEjQWwg@cluster0.6h6rw8y.mongodb.net/PayTM");

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 30,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minLength : 7
    },
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 30,
        trim : true
    },
    lastName : {
        type : String,
        maxLength : 50,
        trim : true
    },
    color : {
        type : String
    }
});

const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}