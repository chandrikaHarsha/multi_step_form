require("dotenv").config();
const express = require("express");
const cors = require('cors');
const DB = require("./DB/db");
const router = require("./Routes/StudentRegistrations/StudentRegistrations");

const app = express();
DB();

app.use(cors(
  
));
app.use(express.json());
app.use("/api/student", router);

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING AT ${process.env.PORT}`);
});
