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

module.exports = router;
