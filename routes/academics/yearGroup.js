const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');
const { createYearGroup, getYearGroups, updateYearGroup, deleteYearGroup } = require('../../controller/academics/yearGroupCtrl');
    
const yearGroupRouter = express.Router();


// yearGroupRouter.post("/:programID", isLogin, isAdmin, createYearGroup);
// yearGroupRouter.get("/", isLogin, getYearGroups);

// route chaining
yearGroupRouter
.route("/")
.post(isLogin, isAdmin, createYearGroup)
.get(isLogin, getYearGroups);

// yearGroupRouter.get("/:id", isLogin, getYearGroups);
// yearGroupRouter.put("/:id", isLogin, isAdmin, updateYearGroup);
// yearGroupRouter.delete("/:id", isLogin, isAdmin, deleteYearGroup);

yearGroupRouter
.route("/:id")
.get(isLogin, getYearGroups)
.put(isLogin, isAdmin, updateYearGroup)
.delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;