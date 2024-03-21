const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');
const { createAcademicTerm, getAcademicTerm, getAcademicTerms, updateAcademicTerm, deleteAcademicTerm } = require('../../controller/academics/academicTermCtrl');


const academicTermRouter = express.Router();


// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears);

// route chaining
academicTermRouter
.route("/")
.post(isLogin, isAdmin, createAcademicTerm)
.get(isLogin, getAcademicTerms);

// academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

academicTermRouter
.route("/:id")
.get(isLogin, getAcademicTerm)
.put(isLogin, isAdmin, updateAcademicTerm)
.delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;