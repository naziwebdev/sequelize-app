const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const localStrategy = require("./strategies/localStrategy");
const jwtAccessTokenStrategy = require("./strategies/jwtAccessTokenStrategy");
const jwtRefreshTokenStrategy = require("./strategies/jwtRefreshTokenStrategy");
const googleStrategy = require('./strategies/googleStrategy')
const passport = require("passport");
const controller = require("./controllers/captcha");
const authRouter = require("./routes/auth");
const articleRouter = require("./routes/article");

const app = express();

//cors policy
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, PUT, POST, DELETE , OPTIONS",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//cookie parser
app.use(cookieParser());

//statics files
app.use(express.static(path.resolve(__dirname, "..", "public")));

//passport
passport.use(localStrategy);
passport.use("accessToken", jwtAccessTokenStrategy);
passport.use("refreshToken", jwtRefreshTokenStrategy);
passport.use(googleStrategy)

//routes
app.get("/captcha", controller.get);
app.use("/auth", authRouter);
app.use("/articles", articleRouter);

//error handler
app.use((err, req, res, next) => {
  return res
    .status(500)
    .json({ mrssage: err.message ? err.message : "internal server error" });
});

module.exports = app;
