const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const { throws } = require("assert");
const Program = require("../../model/Academic/Program");

// @dec Create Program
// @route POST /api/v1/programs
// @access Private
exports.createProgram = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;

    // check if exist
    const program = await Program.findOne({name});
    if(program){
        throw new Error("Program already exists");
    }

    // create program
    const programCreated = await Program.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    // push Program into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(programCreated._id);
    await admin.save();
    
    res.status(201).json({
        status: "success",
        message: "program created successfully",
        data: programCreated,
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

// @dec Update Class Level
// @route PUT /api/v1/class-levels/:id
// @access Private
exports.updateClassLevel = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // check name exists
    const createClassLevelFound = await ClassLevel.findOne({name});
    if(createClassLevelFound){
        throw new Error("Class Level already exists");
    }

    const classLevel = await ClassLevel.findByIdAndUpdate(
        req.params.id,
        {
            name, 
            description,
            createdBy: req.userAuth._id,
        },
        {
            new : true,
        }
        );

    res.status(201).json({
        status: "success",
        message: "Specified Class Level Updated successfully",
        data: classLevel,
    });
}); 

// @dec Delete Class Level
// @route DELETE /api/v1/class-levels/:id
// @access Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
    
    await ClassLevel.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Class Level Deleted successfully",
    });
}); 