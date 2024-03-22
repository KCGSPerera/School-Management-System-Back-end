const Teacher = require("../model/Staff/Teacher");
const verifyToken = require("../utills/verifyToken");


const isTeacherLogin = async (req, res, next) => {
// get token from header
const headerObj = req.headers;
const token = headerObj?.authorization?.split(" ")[1]; // getting the second index, which is token
// verify token
const verifiedToken = verifyToken(token);
if(verifiedToken){
// find the teacher
const user = await Teacher.findById(verifiedToken.id).select("name email role");
// save the user into req. object
req.userAuth = user;
next();
} else {
    const err = new Error("Token expired or Invalid");
    next(err);
}
};

module.exports = isTeacherLogin;