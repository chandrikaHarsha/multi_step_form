const express = require("express");
const {
  createStudent,
  getStudent,
  saveDraftStep,
  publishStudent,
} = require("../../Controllers/StudentRegistration");

const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudent);
router.put("/draft/:id", saveDraftStep);
router.put("/publish/:id", publishStudent);

module.exports = router;
