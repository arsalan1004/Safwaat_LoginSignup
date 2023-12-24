const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

// REQUIRING VARIABLES
const port = process.env.PORT;
const jwtsecret = process.env.JWT_SECRET;

// CONNECTING TO DATABASE
require("./config/db");

// REQUIRING ROUTES
const { signupRouter } = require("./api/routes/signupRoute");
const { loginRouter } = require("./api/routes/loginRoute");

// CREATING APP
const app = express();

// MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: jwtsecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "None", // Adjust based on your requirements
      secure: process.env.NODE_ENV === "production", // Set to true in production
    },
  })
);
app.use(morgan("tiny"));

// ROUTES
app.use("/", signupRouter);
app.use("/", loginRouter);

// CREATING SERVER
server = http.createServer(app);

// LISTENING SERVER
server.listen(port, () => console.log(`Server listening on port: ${port}`));
