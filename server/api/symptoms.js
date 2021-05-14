const router = require('express').Router();
const {
  User,
  Doctor,
  Profession,
  Specialty,
  Patient,
  Symptom,
} = require('../db');

const { isDoctor, isPatient, isLoggedIn } = require('../middleware');
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

//post /api/symptoms
router.post('/', isLoggedIn, isPatient, async (req, res, next) => {
  try {
    const patient = await req.user.getPatient();
    const { name } = req.body;
    let symptom = await Symptom.create({
      name,
    });
    await patient.addSymptom(symptom);
    res.send(symptom);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
