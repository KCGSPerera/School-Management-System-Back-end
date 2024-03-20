const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

exports.createAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear, createdBy } = req.body;
    res.status(201).json({
        status: "success",
        message: "Academic Year created successfully",
        data: "",
    })
}); 