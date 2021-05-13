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
    const doctor = await Doctor.findByPk(docId, {
      include: [User, Profession, Specialty],
    });
    if (!doctor.id) {
      res.status(404).send("This doctor does not exist in the DB");
    } else {
      res.send(doctor);
    }
  } catch (err) {
    next(err);
  }
});

//PUT /api/doctors/:id
router.put("/:id", async (req, res, next) => {
  try {
    const docId = req.params.id;
    // const {} = req.body;
    const doctor = await Doctor.findByPk(docId, {
      include: [User, Profession, Specialty],
    });

    console.log("doctor =========>>>>>>>>>", doctor);

    if (!doctor.id) {
      res.status(404).send("This doctor does not exist in the DB");
      return;
    }

    const updatedDoc = await doctor.update(req.body);

    res.send(updatedDoc);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
