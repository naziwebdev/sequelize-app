const express = require("express");
const controller = require("../controllers/article");
const passport = require("passport");
const {multerStorage} = require("../middlewares/uploaderConfigs");

const router = express.Router();

const upload = multerStorage("public/images/covers");

router
  .route("/")
  .post(
    passport.authenticate("accessToken", { session: false }),
    upload.single("cover"),
    controller.create
  )
  .get(controller.getAll)

  router.route('/:slug').get(controller.findBySlug)

  router.route('/:id').put(passport.authenticate("accessToken", { session: false }),
  upload.single("cover"),
  controller.update)
  .delete(passport.authenticate('accessToken',{session:false}),controller.remove)

module.exports = router;
