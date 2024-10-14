const express = require("express");
const controller = require("../controllers/auth");
const passport = require("passport");
const { validateCaptcha } = require("../middlewares/captcha");

const router = express.Router();
router.route("/register").post(controller.register);
router
  .route("/login")
  .post(passport.authenticate("local", { session: false }), controller.login);

router
  .route("/refresh")
  .post(
    passport.authenticate("refreshToken", { session: false }),
    controller.refresh
  );

router
  .route("/me")
  .get(passport.authenticate("accessToken", { session: false }), controller.me);

router
  .route("/logout")
  .post(
    passport.authenticate("accessToken", { session: false }),
    controller.logout
  );

module.exports = router;
