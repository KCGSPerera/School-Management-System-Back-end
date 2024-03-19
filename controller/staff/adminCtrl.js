const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utills/generateToken");
const verifyToken = require("../../utills/verifyToken");

// @dec Admin register
// @route POST /api/v1/admins/register
// @access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    
        // check if email exist
        const adminFound = await Admin.findOne({email});
        if(adminFound){
            throw new Error("Admin Exist");
        }
        // register
        const user = await Admin.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            status: "Success",
            data: user,
            message: "admin registered succesfully",
        });
    
});

// @dec Admin login
// @route POST /api/v1/admins/login
// @access Private
exports.loginAdminCtrl =  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
        // find user
        const user = await Admin.findOne({email});
        if(!user){
            return res.json({message: "User not found"});
        }
        if(user && (await user.verifyPassword(password))) {

            return res.json({
                data: generateToken(user._id),
                message: "Admin logged in successfully",
        });
        } else {
            return res.json({message: "Invalid login credentials"});
        }     
    
});

// @dec Get all Admin
// @route GET /api/v1/admins/
// @access Private
exports.getAdminsCtrl = AsyncHandler (async(req, res) => {  
    const admins = await Admin.find();
    res.status(200).json({
        status: "success",
        message: "Admins fetched successfully",
        data: admins,
    });
});

// @dec Get single Admin
// @route GET /api/v1/admins/:id
// @access Private
exports.getAdminProfileCtrl =  AsyncHandler(async(req, res) => {
  
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt");
    if(!admin){
        throw new Error("Admin not found");
    } else {
        res.status(200).json({
            status : "success",
            data : admin,
            message : "Admin profile fetched successfully",
        });
    }
}); 

// @dec update Admin
// @route PUT /api/v1/admins/:id
// @access Private
exports.updateAdminCtrl =  (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Update Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec delete Admin
// @route DELETE /api/v1/admins/:id
// @access Private
exports.deleteAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Delete Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec Suspend a teacher
// @route PUT /api/v1/admins/suspend/teacher/:id
// @access Private
exports.adminSuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin suspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec Unuspend a teacher
// @route PUT /api/v1/admins/unsuspend/teacher/:id
// @access Private
exports.adminUnsuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin unsuspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec Withdraw a teacher
// @route PUT /api/v1/admins/withdraw/teacher/:id
// @access Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin withdraw teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec Unwithdraw a teacher
// @route PUT /api/v1/admins/unwithdraw/teacher/:id
// @access Private
exports.adminUnwithdrawTeacherCtrl =  (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin unwithdraw teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec Publish exam results
// @route PUT /api/v1/admins/publish/exam/:id
// @access Private
exports.adminPublishResults =  (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin publish exam",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

// @dec Unpublish exam results
// @route PUT /api/v1/admins/unpublish/exam/:id
// @access Private
exports.adminUnpublishResults = (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin unpublish exam",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
