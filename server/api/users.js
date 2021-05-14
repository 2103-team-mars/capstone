const router = require("express").Router();
const { User } = require("../db");
const { isDoctor, isLoggedIn } = require("../middleware");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//PUT /api/users/:id
router.put("/:id", isLoggedIn, isDoctor, async (req, res, next) => {
  try {
    const doctor = req.user;

    const { firstName, lastName, profilePicture, location } = req.body;

    const updatedDoc = await doctor.update({
      firstName,
      lastName,
      profilePicture,
      location,
    });

    res.send(updatedDoc);
  } catch (err) {
    next(err);
  }
});
