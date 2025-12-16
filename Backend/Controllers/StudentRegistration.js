const StudentRegistrations = require("../Models/StudentRegistration");

// create empty draft
const createStudent = async (req, res) => {
  try {
    const student = await StudentRegistrations.create({});
    res.json(student);
  } catch (err) {
    console.log("Student Creation Error: ", err);
  }
};

// get draft (resume)
const getStudent = async (req, res) => {
  try {
    const student = await StudentRegistrations.findById(req.params.id);
    res.json(student);
  } catch (err) {
    console.log("Error while fetching student: ", err);
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
  createStudent,
  getStudent,
  saveDraftStep,
  publishStudent,
};
