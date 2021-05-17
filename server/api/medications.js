const router = require('express').Router();
const {
  User,
  Doctor,
  Profession,
  Specialty,
  Patient,
  Symptom,
  Medication,
} = require('../db');

const { isDoctor, isPatient, isLoggedIn } = require('../middleware');

//get /api/medications
router.get('/patients/:id', async (req, res, next) => {
  try {
    const medications = await Medication.findAll({
      where: { patientId: req.params.id },
      include: {
        model: Doctor,
        include: { model: User, attributes: ['firstName', 'lastName'] },
      },
    });
    res.send(medications);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
