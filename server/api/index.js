const router = require("express").Router();
const { isLoggedIn } = require("../middleware");

module.exports = router;

router.use("/users", require("./users"));
router.use("/doctors", require("./doctors"));
router.use("/symptoms", require("./symptoms"));
router.use("/medications", require("./medications"));
router.use("/patients", require("./patients"));
router.use("/specialty", require("./specialty"));
router.use("/appointments", isLoggedIn, require("./appointments"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
