const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    draft: {
      step1: { type: Object, default: {} },
      step2: { type: Object, default: {} },
      step3: { type: Object, default: {} },
    },
    published: {
      step1: { type: Object, default: {} },
      step2: { type: Object, default: {} },
      step3: { type: Object, default: {} },
    },
  },
  { TimeStamp: true }
);

module.exports = mongoose.model("StudentRegistrations", StudentSchema);
