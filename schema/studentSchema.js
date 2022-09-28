const mongooose = require("mongoose");

const studentSchemea = mongooose.Schema({
  name: { type: String, required: true },
  father: { type: String, required: true },
  roll: { type: Number, required: true, unique: true },
  standard: { type: String, required: true },
  marks: { type: mongooose.Schema.Types.ObjectId, ref: "Marks" },
});

const Student = mongooose.model("Student", studentSchemea);
module.exports = Student;
