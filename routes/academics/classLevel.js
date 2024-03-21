const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');
const { createClassLevel, getClassLevel, getClassLevels, updateClassLevel, deleteClassLevel } = require('../../controller/academics/classLevelCtrl');


const classLevelRouter = express.Router();


// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears);

// route chaining
classLevelRouter
.route("/")
.post(isLogin, isAdmin, createClassLevel)
.get(isLogin, getClassLevels);

// academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

classLevelRouter
.route("/:id")
.get(isLogin, getClassLevel)
.put(isLogin, isAdmin, updateClassLevel)
.delete(isLogin, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;