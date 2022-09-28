const express = require("express");
const Student = require("../../schema/studentSchema");
const Marks = require("../../schema/markSchema");

const app = express();

const router = express.Router();

router.get("/:roll", async (req, res) => {
  const obj = await Student.findOne({ roll: req.params.roll }).populate(
    "marks"
  );
  if (obj == null) {
    res.status(400).end("student not found");
    return;
  }
  const inMarks = await Marks.findOne({ student: obj });
  if (inMarks == null) {
    res.status(400).send("marks not submitted yet for the student");
    return;
  }
  // console.log(typeof(obj.marks))
  // const data = {
  //   name: obj.name,
  //   roll: obj.roll,
  //   standard: obj.standard,
  //   sub1: obj.marks.subject1,
  //   sub2: obj.marks.subject2,
  //   sub3: obj.marks.subject3,
  //   sub4: obj.marks.subject4,
  // };
  res.status(200).send(obj.marks.marks);
});

router.post("/:roll", async (req, res) => {
  const roll = req.params.roll;
  const student = await Student.findOne({ roll: roll }).catch((err) =>
    res.status(400).end("some error occourd")
  );
  if (student == null) {
    res.status(200).send("student with this roll no not exists");
  } else {
    let arr = [];
    Object.entries(req.body).forEach((item) => {
      const obj = {};
      obj[item[0]] = item[1];
      arr.push(obj);
    });
    const data = {
      student: student,
      marks: arr,
    };

    const isInMarks = await Marks.findOne({ student: student._id });
    if (isInMarks == null) {
      const newMark = new Marks(data);
      const onj = await newMark.save().then(async (newObj) => {
        await Student.updateOne({ roll: roll }, { marks: newObj._id }).then(
          (re) => console.log(re)
        );
        res.status(200).send(`marks for roll no. ${roll} is inserted.`);
      });
    } else {
      res
        .status(200)
        .send(
          `marks for roll no. ${roll} is already present for updation use another query`
        );
    }
  }
});

router.patch("/:roll", async (req, res) => {
  const studentId = await Student.findOne({ roll: req.params.roll });
  const up = await Marks.findOne({ student: studentId });
  if (studentId == null) {
    res.status(200).send("this student not exist");
    return;
  } else if (up == null) {
    res.status(200).send("marks for this student is not submitted yet");
    return;
  } else {
    await Marks.updateOne(
      { student: studentId },
      { $push: { marks: { $each: [req.body] } } }
    );
    // await Marks.updateOne({student: studentId, "marks.subject1": 25}, {$set: {"marks.$.subject1": "25"}}, {upsert: true})
  }
  const upp = await Marks.findOne({ student: studentId });
  res.status(200).send(upp.marks);
});

module.exports = router;
