const router = require('express').Router();
const { User, Doctor, Profession, Specialty } = require('../db');

//get /api/doctors
router.get('/', async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({
      include: [User, Profession, Specialty],
    });
    res.json(doctors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
