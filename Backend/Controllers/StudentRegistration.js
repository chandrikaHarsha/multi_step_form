const StudentRegistration = require("../Models/StudentRegistration");
const StudentRegistrations = require("../Models/StudentRegistration");

// create empty draft
// const createStudent = async (req, res) => {
//   try {
//     const student = await StudentRegistrations.create({});
//     res.json(student);
//   } catch (err) {
//     console.log("Student Creation Error: ", err);
//   }
// };

// get draft (resume)
const getStudent = async (req, res) => {
  try {
    let student;
    if (req.session.studentId) {
      student = await StudentRegistration.findById(req.session.studentId);
    }
    if (!student) {
      student = await StudentRegistration.create({});
      req.session.studentId = student._id;
    }
    if (student.status === "published") {
      return res.status(403).json({ message: "Form already submitted." });
    }
    const currentStep = !student?.draft?.step1?.name
      ? 1
      : !student?.draft?.step2?.number
      ? 2
      : 3;
    res.json({ draft: student.draft, currentStep, id: student._id });
  } catch (err) {
    console.log("Error while fetching student: ", err);
    res.status(500).json({ error: err.message });
  }
};

// save/update step
const saveDraftStep = async (req, res) => {
  const { step, data } = req.body;
  try {
    await StudentRegistrations.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          [`draft.${step}`]: data,
          status: "draft",
        },
      },
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.log("Error while saving as a draft: ", err);
  }
};

// publish
const publishStudent = async (req, res) => {
  try {
    await StudentRegistrations.findByIdAndUpdate(
      req.params.id,
      [
        {
          $set: {
            published: "$draft",
            draft: {
              step1: {},
              step2: {},
              step3: {},
            },
            status: "published",
          },
        },
      ],
      {
        updatePipeline: true,
        new: true,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.log("Error on final step: ", err);
  }
};

module.exports = {
  // createStudent,
  getStudent,
  saveDraftStep,
  publishStudent,
};
