const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');
const { createProgram, getPrograms, getProgram, updateProgram, deleteProgram } = require('../../controller/academics/programCtrl');

const programRouter = express.Router();


// programRouter.post("/", isLogin, isAdmin, createAcademicYear);
// programRouter.get("/", isLogin, isAdmin, getAcademicYears);

// route chaining
programRouter
.route("/")
.post(isLogin, isAdmin, createProgram)
.get(isLogin, getPrograms);

// programRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// programRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// programRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

programRouter
.route("/:id")
.get(isLogin, getProgram)
.put(isLogin, isAdmin, updateProgram)
.delete(isLogin, isAdmin, deleteProgram);

module.exports = programRouter;