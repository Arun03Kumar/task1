const express = require("express");
const student = require("./routes/api/student");
const marks = require("./routes/api/marks");
require("./db_connection");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/student", student);
app.use("/api/marks", marks);

app.listen(3000, () => {
  console.log("server is started at localhost:3000");
});

//student system
// 4 end points

// 1. add
// 2. get
// 3. add subject
// 4. get info of marks particular student
// 5. total students
//name, class,
// marks Collection
// student Collection
// add marks
//
