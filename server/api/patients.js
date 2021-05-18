const router = require('express').Router();
const {
  User,
  Doctor,
  Profession,
  Specialty,
  Medication,
  Symptom,
  Patient,
} = require('../db');
const { isDoctor, isPatient, isLoggedIn } = require('../middleware');

//get /api/patients/id
router.get('/:id', async (req, res, next) => {
  try {
    const patient = await Patient.findOne({
      include: [User, Medication, Symptom],
      where: {
        id: req.params.id,
      },
    });
    res.json(patient);
  } catch (error) {
    next(error);
  }
});

//put /api/patients/id
router.put('/:id', isLoggedIn, isPatient, async (req, res, next) => {
  try {
    const patient = req.user;
    await patient.update(req.body);
    res.send(patient);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
