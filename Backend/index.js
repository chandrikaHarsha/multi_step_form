require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB = require("./DB/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = require("./Routes/StudentRegistrations/StudentRegistrations");

const app = express();
DB();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "https://multi-step-form-alpha-blond.vercel.app/",
    credentials: true,
  })
);

app.use(session({
  name:"student_registration",
  secret:process.env.SESSION_SECRET,
  resave:false,
saveUninitialized:false,
store:MongoStore.create({
  mongoUrl:process.env.MONGODB_URI,
  collectionName:"sessions",
}),
cookie:{
  httpOnly:true,
  secure:process.env.NODE_ENV==="production",
  sameSite:"none",
  maxAge:1000*60*60*24*7  
}
}))

app.use(express.json());
app.use("/api/student", router);

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING AT ${process.env.PORT}`);
});
