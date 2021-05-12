const router = require('express').Router();
const {
  User,
  Doctor,
  Profession,
  Specialty,
  Patient,
  Symptom,
} = require('../db');

//get /api/symptoms
router.get('/', async (req, res, next) => {
  try {
    const symptoms = await Patient.findOne({
      include: Symptom,
    });
    res.send(symptoms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
