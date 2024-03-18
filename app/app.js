const express  = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan("dev"));

// we write all the login in the app.js file
// But here we don't have business login


// Routes


// Admin register
app.post("/api/v1/admins/register", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin has been registered",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin login
app.post("/api/v1/admins/login", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin has been logged in",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Get all admins
app.get("/api/v1/admins", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "All Admins",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Get single admin
app.get("/api/v1/admins/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Single Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Update admin
app.put("/api/v1/admins/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Update Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Delete admin
app.delete("/api/v1/admins/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Delete Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin suspending a teacher
app.put("/api/v1/admins/suspend/teacher/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin suspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin unsuspending a teacher
app.put("/api/v1/admins/unsuspend/teacher/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin unsuspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin withdrawing a teacher
app.put("/api/v1/admins/withdraw/teacher/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin withdraw teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin unwithdrawing a teacher
app.put("/api/v1/admins/unwithdraw/teacher/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin unwithdraw teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin publish exam results
app.put("/api/v1/admins/publish/exam/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin publish exam",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

// Admin unpublish exam results
app.put("/api/v1/admins/unpublish/exam/:id", (req, res) => {
    try {
        res.status(201).json({
            status: "Success",
            data: "Admin unpublish exam",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
})

module.exports = app;