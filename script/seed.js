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

const professionData = [{ name: 'Psychiatrist' }, { name: 'Psychologist' }, { name: 'Therapist' }];
const specialtyData = [{ name: 'Despression' }, { name: 'Anxiety' }, { name: 'Eating disorder' }];
const symptomData = [
  { name: 'Constant fatigue' },
  { name: 'Loss of appetite' },
  { name: 'Sleep deprevation' },
];

const userData = [
  {
    email: 'doc1@gmail.com',
    firstName: 'Doctor',
    lastName: '1',
    password: '123',
    metaType: 'doctor',
    age: 40,
    sex: 'male',
    dob: Date.now(),
    location: '5760 Irving Park Rd, Chicago, IL 60634',
  },
  {
    email: 'doc2@gmail.com',
    firstName: 'Doctor',
    lastName: '2',
    password: '123',
    metaType: 'doctor',
    age: 40,
    sex: 'female',
    dob: Date.now(),
    location: '567 Wabash Ave NW, New Philadelphia, OH 44663',
  },
  {
    email: 'pat1@gmail.com',
    firstName: 'Patient',
    lastName: '1',
    password: '123',
    metaType: 'patient',
    age: 40,
    sex: 'male',
    dob: Date.now(),
    location: '1601 E Basin Ave, Pahrump, NV 89060',
  },
  {
    email: 'pat2@gmail.com',
    firstName: 'Patient',
    lastName: '2',
    password: '123',
    metaType: 'patient',
    age: 40,
    sex: 'female',
    dob: Date.now(),
    location: '5110 N 40th St #201, Phoenix, AZ 85018',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const [psychiatrist, psychologist] = await Profession.bulkCreate(professionData);
  const [depression, anxiety, eating] = await Specialty.bulkCreate(specialtyData);
  const [fatigue, food, sleep] = await Symptom.bulkCreate(symptomData);

  const [doc1user, doc2user, pat1user, pat2user] = await User.bulkCreate(userData);
  const [doc1, doc2] = await Promise.all([
    Doctor.create({ rating: 5 }),
    Doctor.create({ rating: 4 }),
  ]);
  const [pat1, pat2] = await Promise.all([Patient.create(), Patient.create()]);

  const apt1 = await Appointment.create({
    date: Date.now(),
    topic: '1st Meeting',
    patientId: pat1.id,
    doctorId: doc1.id,
  });
  const apt2 = await Appointment.create({
    date: Date.now(),
    topic: '1st Meeting',
    patientId: pat2.id,
    doctorId: doc2.id,
  });

  await Promise.all([
    doc1user.setDoctor(doc1),
    doc2user.setDoctor(doc2),
    pat1user.setPatient(pat1),
    pat2user.setPatient(pat2),
  ]);

  await doc1.setProfession(psychiatrist);
  await doc2.setProfession(psychologist);

  await doc1.addSpecialties([depression, anxiety]);
  await doc2.addSpecialty(eating);

  await pat1.addSymptoms([fatigue, food]);
  await pat2.addSymptom(sleep);

  await doc1.addPatients([pat1, pat2]);
  await doc2.addPatient(pat2);

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
