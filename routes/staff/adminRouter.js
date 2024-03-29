const express = require('express');
// const app = require('../../app/app');
const { registerAdminCtrl, 
    loginAdminCtrl, 
    getAdminsCtrl, 
    getAdminProfileCtrl, 
    updateAdminCtrl, 
    deleteAdminCtrl, 
    adminSuspendTeacherCtrl, 
    adminUnsuspendTeacherCtrl, 
    adminWithdrawTeacherCtrl, 
    adminUnwithdrawTeacherCtrl, 
    adminPublishResults, 
    adminUnpublishResults,
    
 } = require('../../controller/staff/adminctrl');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');

const adminRouter = express.Router();

// We moved the business logic from app.js to adminRouter.js

// Register
adminRouter.post("/register", registerAdminCtrl);

// Login
adminRouter.post("/login", loginAdminCtrl);

// Get all
adminRouter.get("/", isLogin, getAdminsCtrl);

// Get single Admin
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);

// Update
adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl);

// Delete
adminRouter.delete("/:id", deleteAdminCtrl);

// Suspend teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);

// Unsuspend teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacherCtrl);

// withdraw teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);

// Unwithdraw teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacherCtrl);

// Publish exam results
adminRouter.put("/publish/exam/:id", adminPublishResults);

// Unpublish exam results
adminRouter.put("/unpublish/exam/:id", adminUnpublishResults);

module.exports = adminRouter;