const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const { throws } = require("assert");
const ClassLevel = require("../../model/Academic/ClassLevel");

// @dec Create Class Level
// @route POST /api/v1/class-levels
// @access Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // check if exist
    const classLevel = await ClassLevel.findOne({name});
    if(classLevel){
        throw new Error("Class Level already exists");
    }

    // create Class Level
    const classLevelCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    // push Class Level into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(classLevelCreated._id);
    await admin.save();
    
    res.status(201).json({
        status: "success",
        message: "Class Level created successfully",
        data: classLevelCreated,
    })
}); 

// @dec Get all Academic Terms
// @route GET /api/v1/academic-terms
// @access Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find();

    res.status(201).json({
        status: "success",
        message: "Academic Terms fetched successfully",
        data: academicTerms,
    });
}); 

// @dec Get single Academic Term
// @route GET /api/v1/academic-terms/:id
// @access Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Academic Term fetched successfully",
        data: academicTerm,
    });
}); 

// @dec Update Academic Term
// @route PUT /api/v1/academic-terms/:id
// @access Private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;

    // check name exists
    const createAcademicTermFound = await AcademicTerm.findOne({name});
    if(createAcademicTermFound){
        throw new Error("Academic Term already exists");
    }

    const academicTerm = await AcademicTerm.findByIdAndUpdate(
        req.params.id,
        {
            name, 
            description,
            duration,
            createdBy: req.userAuth._id,
        },
        {
            new : true,
        }
        );

    res.status(201).json({
        status: "success",
        message: "Specified Academic Term Updated successfully",
        data: academicTerm,
    });
}); 

// @dec Delete Academic Term
// @route DELETE /api/v1/academic-terms/:id
// @access Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
    
    await AcademicTerm.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Academic Term Deleted successfully",
    });
}); 