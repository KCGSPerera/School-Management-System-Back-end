const express = require('express');
const app = require('../../app/app');

const adminRouter = express.Router();

// Register
adminRouter.post("/register", (req, res) => {
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
});

// Login
adminRouter.post("/login",  (req, res) => {
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
});

// Get all
adminRouter.get("/", (req, res) => {   // check whether it is app.get or adminRouter.get
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
});

// Get single Admin
adminRouter.get("/:id", (req, res) => {
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
});

// Update
adminRouter.put("/:id", (req, res) => {
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
});

// Delete
adminRouter.delete("/:id", (req, res) => {
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
});

// Suspend teacher
adminRouter.put("/suspend/teacher/:id", (req, res) => {
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
});

// Unsuspend teacher
adminRouter.put("/unsuspend/teacher/:id", (req, res) => {
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
});

// withdraw teacher
adminRouter.put("/withdraw/teacher/:id", (req, res) => {
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
});

// Unwithdraw teacher
adminRouter.put("/unwithdraw/teacher/:id", (req, res) => {
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
});

// Publish exam results
adminRouter.put("/publish/exam/:id", (req, res) => {
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
});

// Unpublish exam results
adminRouter.put("/unpublish/exam/:id", (req, res) => {
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
});

module.exports = adminRouter;