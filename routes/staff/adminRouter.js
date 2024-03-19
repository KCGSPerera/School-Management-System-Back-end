const express = require('express');
const app = require('../../app/app');
const { registerAdminCtrl, 
    loginAdminCtrl, 
    getAdminsCtrl, 
    getAdminCtrl, 
    updateAdminCtrl, 
    deleteAdminCtrl, 
    adminSuspendTeacherCtrl, 
    adminUnsuspendTeacherCtrl, 
    adminWithdrawTeacherCtrl, 
    adminUnwithdrawTeacherCtrl, 
    adminPublishResults, 
    adminUnpublishResults,
    
 } = require('../../controller/staff/adminctrl');

const adminRouter = express.Router();

// We moved the business logic from app.js to adminRouter.js

// Register
adminRouter.post("/register", registerAdminCtrl);

// Login
adminRouter.post("/login", loginAdminCtrl);

// Get all
adminRouter.get("/", getAdminsCtrl);

// Get single Admin
adminRouter.get("/:id", getAdminCtrl);

// Update
adminRouter.put("/:id", updateAdminCtrl);

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