const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClassLevelSchema = new Schema(
  {
    //level100/200/300/400
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    //students will be added to the class level when they are registered
    // This is used to get how many studnets are in aparticular class
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    //optional.
    // This is used to get how many subjects are there for a particular class
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    // This is to get how many teacher are there for a particular class 
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);

module.exports = ClassLevel;
