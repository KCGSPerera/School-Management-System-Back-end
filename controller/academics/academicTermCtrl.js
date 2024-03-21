const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const { throws } = require("assert");
const AcademicTerm = require("../../model/Academic/AcademicTerm");

// @dec Create Academic Term
// @route POST /api/v1/academic-terms
// @access Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // check if exist
    const academicTerm = await AcademicTerm.findOne({name});
    if(academicTerm){
        throw new Error("Academic term already exists");
    }

    // create academic year
    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    // push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save();
    
    res.status(201).json({
        status: "success",
        message: "Academic Term created successfully",
        data: academicTermCreated,
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