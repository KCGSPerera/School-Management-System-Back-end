const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

// @dec Create Academic Year
// @route POST /api/v1/academic-years
// @access Private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;

    // check if exist
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear){
        throw new Error("Academic year already exists");
    }

    // create academic year
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
    });
    res.status(201).json({
        status: "success",
        message: "Academic Year created successfully",
        data: academicYearCreated,
    })
}); 

// @dec Get all Academic Years
// @route GET /api/v1/academic-years
// @access Private
exports.getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find();

    res.status(201).json({
        status: "success",
        message: "Academic Years fetched successfully",
        data: academicYears,
    })
}); 