const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");
const { throws } = require("assert");

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
    // push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
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
    });
}); 

// @dec Get single Academic Year
// @route GET /api/v1/academic-years/:id
// @access Private
exports.getAcademicYear = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Academic Year fetched successfully",
        data: academicYear,
    });
}); 

// @dec Update Academic Year
// @route PUT /api/v1/academic-years/:id
// @access Private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;

    // check name exists
    const createAcademicYearFound = await AcademicYear.findOne({name});
    if(createAcademicYearFound){
        throw new Error("Academic Year already exists");
    }

    const academicYear = await AcademicYear.findByIdAndUpdate(
        req.params.id,
        {
            name, 
            fromYear,
            toYear,
            createdBy: req.userAuth._id,
        },
        {
            new : true,
        }
        );

    res.status(201).json({
        status: "success",
        message: "Specified Academic Year Updated successfully",
        data: academicYear,
    });
}); 

// @dec Delete Academic Year
// @route DELETE /api/v1/academic-years/:id
// @access Private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
    
    await AcademicYear.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Academic Year Deleted successfully",
    });
}); 