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
    const { name, description } = req.body;

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