'use strict';

const {
  db,
  User,
  Medication,
  Appointment,
  DoctorPatient,
  Symptom,
  Specialty,
  Profession,
  Doctor,
  Patient,
} = require('../server/db');

const _ = require('lodash');

const professionData = [{ name: 'Psychiatrist' }, { name: 'Psychologist' }, { name: 'Therapist' }];
const specialtyData = [
  { name: 'Anxiety' },
  { name: 'ADHD' },
  { name: 'Bipolar disorder' },
  { name: 'OCD' },
  { name: 'PTSD' },
  { name: 'Psychosis' },
  { name: 'Schizophrenia' },
  { name: 'Despression' },
  { name: 'Eating disorder' },
];
const symptomData = require('./symptomData');
const medicationData = require('./medicationData');
const topicData = require('./topicData');
const generateUserData = require('./userData');

const randInt = (a, b) => {
  return Math.floor(Math.random() * (b - a) + a);
};

const randDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateDoctorData = () => {
  const doctorData = [];
  for (let i = 0; i < 500; i++) {
    doctorData.push({ rating: randInt(1, 6) });
  }
  return doctorData;
};

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const professions = await Profession.bulkCreate(professionData);
  const specialties = await Specialty.bulkCreate(specialtyData);
  const symptoms = await Symptom.bulkCreate(symptomData);

  const [userPatientData, userDoctorData] = await generateUserData();
  const patientUsers = await User.bulkCreate(userPatientData);
  const doctorUsers = await User.bulkCreate(userDoctorData);

  const doctors = await Doctor.bulkCreate(generateDoctorData());
  const patients = await Promise.all(
    Array(200)
      .fill(0)
      .map(() => Patient.create())
  );

  for (let i = 0; i < patientUsers.length; i++) {
    await patientUsers[i].setPatient(patients[i]);
  }

  for (let i = 0; i < doctorUsers.length; i++) {
    await doctorUsers[i].setDoctor(doctors[i]);
  }

  const past = new Date();
  const future = new Date();
  past.setDate(past.getDate() - 20);
  future.setDate(future.getDate() + 150);

  const appointments = [];

  for (let doc of doctors) {
    const profIdx = randInt(0, professions.length);
    await doc.setProfession(professions[profIdx]);

    const specialtyIdxs = new Set();
    const randomSpecialties = [];
    for (let i = 0; i < 3; i++) {
      const specialtyIdx = randInt(0, specialties.length);
      if (!specialtyIdxs.has(specialtyIdx)) {
        specialtyIdxs.add(specialtyIdx);
        randomSpecialties.push(specialties[specialtyIdx]);
      }
    }
    await doc.addSpecialties(randomSpecialties);

    for (let i = 0; i < 5; i++) {
      const appointment = await Appointment.create({
        date: randDate(past, future),
        topic: '',
        doctorId: doc.id,
      });
      appointments.push(appointment);
    }
  }

  const shuffledAppointments = _.shuffle(appointments);

  for (let i = 0; i < patients.length; i++) {
    await patients[i].addSymptom(symptoms[i]);

    for (let j = 0; j < 2; j++) {
      await shuffledAppointments[i * 2 + j].update({
        topic: topicData[i * 2 + j].topic,
        patientId: patients[i].id,
      });
    }
  }

  const medications = await Medication.bulkCreate(medicationData);
  const shuffledDoctors = _.shuffle(doctors);

  for (let i = 0; i < patients.length; i++) {
    const doc = shuffledDoctors[i];
    const pat = patients[i];
    const med = medications[i];
    await Promise.all([med.setDoctor(doc), med.setPatient(pat)]);
  }

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
