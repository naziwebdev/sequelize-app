const express = require("express");
const controller = require("../controllers/article");
const passport = require("passport");

const router = express.Router();

router
  .route("/")
  .post(
    passport.authenticate("accessToken", { session: false }),
    controller.create
  );

module.exports = router;
