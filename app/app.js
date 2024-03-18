const express  = require('express');
const morgan = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');

const app = express();

// Middlewares
app.use(morgan("dev"));

// we write all the login in the app.js file
// But here we don't have business login

// Routes

// Admin 
app.use("/api/v1/admins", adminRouter);

module.exports = app;