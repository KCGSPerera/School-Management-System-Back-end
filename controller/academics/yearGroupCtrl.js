const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const { throws } = require("assert");
const YearGroup = require("../../model/Academic/YearGroup");

// @dec Create Year Group
// @route POST /api/v1/year-groups
// @access Private
exports.createYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear} = req.body;

    // check if exist
    const yearGroup = await YearGroup.findOne({name});
    if(yearGroup){
        throw new Error("Year Group/graduation year already exists");
    }

    // create Year Group
    const yearGroupCreated = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id,
    });

    // push Subject into admin
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error("Admin not found to push year group")
    }
    admin.yearGroups.push(yearGroupCreated._id);
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Year group created successfully",
        data: yearGroupCreated,
    })
}); 

// @dec Get all Year Groups
// @route GET /api/v1/year-groups
// @access Private
exports.getYearGroups = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.find();

    res.status(201).json({
        status: "success",
        message: "All Year Groups fetched successfully",
        data: yearGroups,
    });
}); 

// @dec Get single Year Group
// @route GET /api/v1/year-groups/:id
// @access Private
exports.getYearGroup = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified year group fetched successfully",
        data: yearGroup,
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

// @dec Delete Subject
// @route DELETE /api/v1/subjects/:id
// @access Private
exports.deleteSubject = AsyncHandler(async (req, res) => {
    
    await Subject.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Specified Subject Deleted successfully",
    });
}); 