const router = require('express').Router();
const { User, Patient, Doctor, Profession } = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup/patient', async (req, res, next) => {
  try {
    const { userInfo, metaInfo } = req.body;
    const user = await User.create({ ...userInfo, metaType: 'patient' });
    const patient = await Patient.create(metaInfo);
    await user.setPatient(patient);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/signup/doctor', async (req, res, next) => {
  try {
    const { userInfo, metaInfo } = req.body;
    const profession = await Profession.findOne({ where: { name: metaInfo.profession } });
    const user = await User.create({ ...userInfo, metaType: 'doctor' });
    const doctor = await Doctor.create(metaInfo);
    await user.setDoctor(doctor);
    await doctor.setProfession(profession);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
module.exports = router;
