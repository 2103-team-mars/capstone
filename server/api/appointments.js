const router = require('express').Router();
const { isDoctor, isPatient } = require('../middleware');
const { Appointment, Doctor, Patient, User } = require('../db');

//GET /api/appointments/
//FOR TESTING PURPOSES
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

//GET /api/appointments/doctors/:id
router.get('/doctors/:id', isDoctor, async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.params.id },
      include: [{ model: Patient, include: User }],
    });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

//GET /api/appointments/users/:id
router.get('/users/:id', isPatient, async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.params.id },
      include: [{ model: Doctor, include: User }],
    });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

//POST /api/appointments
router.post('/', isDoctor, async (req, res, next) => {
  try {
    const { dateTime } = req.body;
    const doctor = req.user;
    const appointment = await Appointment.create({
      date: new Date(dateTime),
      doctorId: doctor.metaId,
      topic: '',
    });
    appointment.dataValues.patient = null;
    res.json(appointment);
  } catch (error) {
    next(error);
  }
});

//PUT /api/appointments/:id
router.put('/:id', isPatient, async (req, res, next) => {
  try {
    const { topic, join } = req.body;
    const patient = req.user;
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{ model: Doctor, include: User }],
    });
    if (join) {
      const updatedAppointment = await appointment.update({
        topic,
        patientId: patient.metaId,
      });
      res.json(updatedAppointment);
    } else {
      await appointment.update({ patientId: null });
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', isDoctor, async (req, res, next) => {
  try {
    await Appointment.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
