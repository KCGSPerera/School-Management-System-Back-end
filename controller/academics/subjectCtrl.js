const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const { throws } = require("assert");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/Program");

// @dec Create Subject
// @route POST /api/v1/subjects
// @access Private
exports.createSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm} = req.body;

    // find the program
    const programFound = await Program.findById(req.params.programId);
    if(!programFound){
        throw new Error("Program not found")
    }
    // check if exist
    const subject = await Program.findOne({name});
    if(subject){
        throw new Error("Subject already exists");
    }

    // create Subject
    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    });

    // // push Subject into admin
    // const admin = await Admin.findById(req.userAuth._id);
    // admin.Subject.push(subjectCreated._id);
    // await admin.save();

    // push to the program
    programFound.subjects.push(subjectCreated._id);
    // save
    await programFound.save();
    
    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subjectCreated,
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
    const { name, description } = req.body;

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

// @dec Delete Program
// @route DELETE /api/v1/programs/:id
// @access Private
exports.deleteProgram = AsyncHandler(async (req, res) => {
    
    await Program.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Program Deleted successfully",
    });
}); 