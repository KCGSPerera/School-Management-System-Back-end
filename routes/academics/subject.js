const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');
const { createSubject, getSubjects, updateSubject, deleteSubject, getSubject } = require('../../controller/academics/subjectCtrl');

const subjectRouter = express.Router();


// subjectRouter.post("/", isLogin, isAdmin, createAcademicYear);
// subjectRouter.get("/", isLogin, isAdmin, getAcademicYears);

// route chaining
subjectRouter
.route("/")
.post(isLogin, isAdmin, createSubject)
.get(isLogin, getSubjects);

// subjectRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// subjectRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// subjectRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

subjectRouter
.route("/:id")
.get(isLogin, getSubject)
.put(isLogin, isAdmin, updateSubject)
.delete(isLogin, isAdmin, deleteSubject);

module.exports = subjectRouter;