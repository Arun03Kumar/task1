const mongoose = require("mongoose");

const markSchema = mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    // subject1: { type: Number, required: true },
    // subject2: { type: Number, required: true },
    // subject3: { type: Number, required: true },
    // subject4: { type: Number, required: true },
    marks: [{}],
  },
  { strict: false }
);

const Marks = mongoose.model("Marks", markSchema);
module.exports = Marks;
