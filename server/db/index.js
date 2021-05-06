//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const { Symptom, Specialty, Profession } = require('./models/metaTables');
const Medication = require('./models/medication');
const Appointment = require('./models/appointment');
const DoctorPatient = require('./models/doctorPatient');

//associations could go here!
User.belongsToMany(User, { through: DoctorPatient, as: 'doctors', foreignKey: 'patientId' });
User.belongsToMany(User, { through: DoctorPatient, as: 'patients', foreignKey: 'doctorId' });

User.hasOne(Medication, { as: 'patient', foreignKey: 'patientId' });
User.hasOne(Medication, { as: 'doctor', foreignKey: 'doctorId' });

User.belongsToMany(User, {
  through: Appointment,
  as: 'appointmentDoctors',
  foreignKey: 'patientId',
});
User.belongsToMany(User, {
  through: Appointment,
  as: 'appointmentPatients',
  foreignKey: 'doctorId',
});

User.belongsToMany(Symptom, { through: 'PatientSymptoms', foreignKey: 'patientId' });
Symptom.belongsToMany(User, { through: 'PatientSymptoms' });

User.belongsToMany(Specialty, { through: 'DoctorSpecialties', foreignKey: 'doctorId' });
Specialty.belongsToMany(User, { through: 'DoctorSpecialties' });

User.belongsTo(Profession);

module.exports = {
  db,
  User,
  Medication,
  Appointment,
  DoctorPatient,
  Symptom,
  Specialty,
  Profession,
};
