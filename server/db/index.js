//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const { Symptom, Specialty, Profession } = require('./models/metaTables');
const Medication = require('./models/medication');
const Appointment = require('./models/appointment');
const DoctorPatient = require('./models/doctorPatient');
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');

//associations could go here!
//maintaining this table as part of a scalable patient doctor association
Doctor.belongsToMany(Patient, { through: DoctorPatient });
Patient.belongsToMany(Doctor, { through: DoctorPatient });

//polymorphic associations
User.belongsTo(Doctor, { contraints: false, foreignKey: 'metaId' });

Doctor.hasOne(User, {
  contraints: false,
  foreignKey: 'metaId',
  scope: {
    metaType: 'doctor',
  },
});

User.belongsTo(Patient, { contraints: false, foreignKey: 'metaId' });

Patient.hasOne(User, {
  contraints: false,
  foreignKey: 'metaId',
  scope: {
    metaType: 'patient',
  },
});

Patient.hasMany(Medication);
Doctor.hasMany(Medication);
Medication.belongsTo(Doctor);
Medication.belongsTo(Patient);

//Appointments
Doctor.belongsToMany(Patient, {
  through: { model: Appointment, unique: false },
});
Patient.belongsToMany(Doctor, {
  through: { model: Appointment, unique: false },
});
Doctor.hasMany(Appointment);
Appointment.belongsTo(Doctor);
Patient.hasMany(Appointment);
Appointment.belongsTo(Patient);

//Symptoms
Patient.hasMany(Symptom);
Symptom.belongsTo(Patient);

Doctor.belongsToMany(Specialty, {
  through: 'DoctorSpecialties',
});
Specialty.belongsToMany(Doctor, { through: 'DoctorSpecialties' });

Doctor.belongsTo(Profession);

module.exports = {
  db,
  User,
  Patient,
  Doctor,
  Medication,
  Appointment,
  DoctorPatient,
  Symptom,
  Specialty,
  Profession,
};
