const express = require("express");
const Student = require("../../schema/studentSchema");

const app = express();

const router = express.Router();

router.get("/", async (req, res) => {
  const allStudents = await Student.find().catch((err) =>
    res.status(400).end("error in finding all atudents")
  );
  res.status(200).send(allStudents);
});

router.get("/:roll", async (req, res) => {
  const roll = req.params.roll;
  const student = await Student.findOne({ roll: roll });
  if (student == null) {
    res.status(200).send("this roll no. is not existed in DB.");
  } else {
    res.status(200).send(student);
  }
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const father = req.body.father;
  const standard = req.body.standard;

  const student = await Student.findOne({
    $and: [{ name: name }, { father: father }, { standard: standard }],
  }).catch((err) => {
    res.status(400).end("some error occoured");
  });

  if (student == null) {
    const newstudent = new Student(req.body);
    await newstudent
      .save()
      .then((ret) => {
        res.status(200).send(`${ret.name} is inserted in database`);
      })
      .catch((err) => res.status(400).end("roll number already existed"));
  } else {
    res.status(200).send(`${student.name} alredy existed in database`);
  }
  //   res.status(200).send("ok");
});

module.exports = router;
