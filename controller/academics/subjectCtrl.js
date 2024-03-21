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

// @dec Get all Subjects
// @route GET /api/v1/subjects
// @access Private
exports.getSubjects = AsyncHandler(async (req, res) => {
    const subjects = await Subject.find();

    res.status(201).json({
        status: "success",
        message: "Subject fetched successfully",
        data: subjects,
    });
}); 

// @dec Get single Subject
// @route GET /api/v1/subjects/:id
// @access Private
exports.getSubject = AsyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified subject fetched successfully",
        data: subject,
    });
}); 

// @dec Update Subject
// @route PUT /api/v1/subjects/:id
// @access Private
exports.updateSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;

    // check Subject exists
    const createSubjectFound = await Subject.findOne({name});
    if(createSubjectFound){
        throw new Error("Subject already exists");
    }

    const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        {
            name, 
            description,
            academicTerm,
            createdBy: req.userAuth._id,
        },
        {
            new : true,
        }
        );

    res.status(201).json({
        status: "success",
        message: "Specified Subject Updated successfully",
        data: subject,
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