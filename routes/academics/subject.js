const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');
const { createSubject, getSubjects, updateSubject, deleteSubject, getSubject } = require('../../controller/academics/subjectCtrl');

const subjectRouter = express.Router();


subjectRouter.post("/:programID", isLogin, isAdmin, createSubject);
subjectRouter.get("/", isLogin, getSubjects);

// // route chaining
// subjectRouter
// .route("/")
// .post(isLogin, isAdmin, createSubject)
// .get(isLogin, getSubjects);

subjectRouter.get("/:id", isLogin, getSubject);
subjectRouter.put("/:id", isLogin, isAdmin, updateSubject);
subjectRouter.delete("/:id", isLogin, isAdmin, deleteSubject);

subjectRouter
.route("/:id")
.get(isLogin, getSubject)
.put(isLogin, isAdmin, updateSubject)
.delete(isLogin, isAdmin, deleteSubject);

module.exports = subjectRouter;