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
router.get('/patients/:id', async (req, res, next) => {
  try {
    const symptoms = await Symptom.findAll({
      include: {
        model: Patient,
        where: {
          id: req.params.id,
        },
        attributes: [],
      },
    });
    res.send(symptoms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
