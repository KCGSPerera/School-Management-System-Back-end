const express  = require('express');
const morgan = require('morgan');
const {globalErrHandler, notFoundErr,} = require('../middlewares/globalErrHandler');
const academicYearRouter = require('../routes/academics/academicYear');
const adminRouter = require('../routes/staff/adminRouter');
const academicTermRouter = require('../routes/academics/academicTerm');
const classLevelRouter = require('../routes/academics/classLevel');
const programRouter = require('../routes/academics/program');

//const notFoundErr = require('../middlewares/globalErrHandler');
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());  // pass incoming JSON data 

// Routes

// Admin 
app.use("/api/v1/admins", adminRouter);
//Academic Year
app.use("/api/v1/academic-years", academicYearRouter);
//Academic Term
app.use("/api/v1/academic-terms", academicTermRouter);
//Class Level
app.use("/api/v1/class-levels", classLevelRouter);
//Program
app.use("/api/v1/programs", programRouter);




// Error handelling middleware
app.use(notFoundErr)
app.use(globalErrHandler);

module.exports = app;