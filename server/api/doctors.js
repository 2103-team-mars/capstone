const router = require('express').Router();
const { User } = require('../db');

//get /api/doctors
router.get('/', async (req, res, next) => {
  try {
    const doctors = await User.findAll({
      where: { isDoctor: true },
    });
    res.json(doctors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
