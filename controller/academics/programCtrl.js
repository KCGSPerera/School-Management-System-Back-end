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

// @dec Get all Program
// @route GET /api/v1/programs
// @access Private
exports.getPrograms = AsyncHandler(async (req, res) => {
    const programs = await Program.find();

    res.status(201).json({
        status: "success",
        message: "Programs fetched successfully",
        data: programs,
    });
}); 

// @dec Get single program
// @route GET /api/v1/programs/:id
// @access Private
exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Program fetched successfully",
        data: program,
    });
}); 

// @dec Update program
// @route PUT /api/v1/programs/:id
// @access Private
exports.updateProgram = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;

    // check pogram exists
    const createProgramFound = await Program.findOne({name});
    if(createProgramFound){
        throw new Error("Program already exists");
    }

    const program = await Program.findByIdAndUpdate(
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
        message: "Specified Class Level Updated successfully",
        data: program,
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