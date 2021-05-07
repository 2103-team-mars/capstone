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
} = require('../server/db');

const professionData = [
  { name: 'Psychiatrist' },
  { name: 'Psychologist' },
  { name: 'Therapist' },
];
const specialtyData = [
  { name: 'Despression' },
  { name: 'Anxiety' },
  { name: 'Eating disorder' },
];
const symptomData = [
  { name: 'Constant fatigue' },
  { name: 'Loss of appetite' },
  { name: 'Sleep deprevation' },
];
const doctorData = [
  {
    email: 'doc1@gmail.com',
    name: 'Doc1',
    password: 'doc1pw',
    isDoctor: true,
    age: 40,
    sex: 'male',
    dob: Date.now(),
    location: 'somewhere',
  },
  {
    email: 'doc2@gmail.com',
    name: 'Doc2',
    password: 'doc2pw',
    isDoctor: true,
    age: 40,
    sex: 'female',
    dob: Date.now(),
    location: 'somewhere',
  },
];
const patientData = [
  {
    email: 'pat1@gmail.com',
    name: 'Pat1',
    password: 'pat1pw',
    isDoctor: false,
    age: 40,
    sex: 'male',
    dob: Date.now(),
    location: '12-6 maybury circle, waterbury, ct',
  },
  {
    email: 'pat2@gmail.com',
    name: 'Pat2',
    password: 'pat2pw',
    isDoctor: false,
    age: 40,
    sex: 'female',
    dob: Date.now(),
    location: 'somewhere',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const [psychiatrist, psychologist] = await Profession.bulkCreate(
    professionData
  );
  const [depression, anxiety, eating] = await Specialty.bulkCreate(
    specialtyData
  );
  const [fatigue, food, sleep] = await Symptom.bulkCreate(symptomData);
  // const [doc1, doc2] = await User.bulkCreate(doctorData);
  const [doc1, doc2] = await Promise.all([
    User.create(doctorData[0]),
    User.create(doctorData[1]),
  ]);
  // const [pat1, pat2] = await User.bulkCreate(patientData);
  const [pat1, pat2] = await Promise.all([
    User.create(patientData[0]),
    User.create(patientData[1]),
  ]);

  await doc1.setProfession(psychiatrist);
  await doc2.setProfession(psychologist);

  await doc1.addSpecialties([depression, anxiety]);
  await doc2.addSpecialty(eating);

  await pat1.addSymptoms([fatigue, food]);
  await pat2.addSymptom(sleep);

  await doc1.addPatients([pat1, pat2]);
  await doc2.addPatient(pat2);

  await doc1.addAppointmentPatient(pat1, {
    through: { date: Date.now(), topic: '1st Meeting' },
  });
  await doc2.addAppointmentPatient(pat2, {
    through: { date: Date.now(), topic: '1st Meeting' },
  });

  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
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
