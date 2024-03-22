const Admin = require("../model/Staff/Admin");


const isAdmin = async (req, res, next) => {
    // find the user
    const userId = req?.userAuth?._id;
    console.log("At the start of isAdmin, userAuth:", req.userAuth);
    const adminFound = await Admin.findById(userId);
    // check if admin
    if(adminFound?.role === 'admin'){
        next();
    } else {
        next(new Error("Access Denied, Admin only..."));
    }
};

module.exports = isAdmin;