const router = require("express").Router();
const { User, Doctor, Profession, Specialty } = require("../db");

//get /api/doctors
router.get("/", async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({
      include: [User, Profession, Specialty],
    });
    res.json(doctors);
  } catch (error) {
    next(error);
  }
});

//GET /api/doctors/:id
router.get("/:id", async (req, res, next) => {
  try {
    const docId = req.params.id;
    const doctor = await Doctor.findAll({
      include: {
        model: User,
        where: {
          id: docId,
        },
      },
    });
    if (doctor.length === 0) {
      res.status(404).send("This doctor does not exist in the DB");
    } else {
      res.send(doctor);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
