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

// @dec Get all Class Level
// @route GET /api/v1/class-levels
// @access Private
exports.getClassLevels = AsyncHandler(async (req, res) => {
    const classLevels = await ClassLevel.find();

    res.status(201).json({
        status: "success",
        message: "Class levels fetched successfully",
        data: classLevels,
    });
}); 

// @dec Get single Class Level
// @route GET /api/v1/class-levels/:id
// @access Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Class Level fetched successfully",
        data: classLevel,
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