require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const {MongoStore} = require("connect-mongo");
const DB = require("./DB/db");
const router = require("./Routes/StudentRegistrations/StudentRegistrations");

const app = express();

// Connect to MongoDB
DB();

// Trust proxy for secure cookies behind Render/Vercel proxy
app.set("trust proxy", 1);

// CORS configuration
app.use(
  cors({
    origin: [
      "https://multi-step-form-alpha-blond.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Session middleware
app.use(
  session({
    name: "student_registration",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Body parser
app.use(express.json());

// API routes
app.use("/api/student", router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ${PORT}`);
});
