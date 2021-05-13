const axios = require('axios');

const populateArray = (data, array, metaType) => {
  data.forEach((user) => {
    const {
      street: { number, name },
      city,
      state,
      postcode,
      country,
    } = user.location;
    array.push({
      email: user.email,
      firstName: user.name.first,
      lastName: user.name.last,
      password: user.login.password,
      profilePicture: user.picture.medium,
      age: user.dob.age,
      sex: user.gender,
      dob: new Date(user.dob.date),
      location: `${number} ${name}, ${city}, ${state}, ${country}, ${postcode}`,
      metaType,
    });
  });
};

module.exports = async () => {
  const testPatientData = [
    {
      email: 'pat1@gmail.com',
      firstName: 'Patient',
      lastName: '1',
      password: '123',
      metaType: 'patient',
    },
    {
      email: 'pat2@gmail.com',
      firstName: 'Patient',
      lastName: '2',
      password: '123',
      metaType: 'patient',
    },
  ];
  const testDoctorData = [
    {
      email: 'doc1@gmail.com',
      firstName: 'Doctor',
      lastName: '1',
      password: '123',
      metaType: 'doctor',
    },
    {
      email: 'doc2@gmail.com',
      firstName: 'Doctor',
      lastName: '2',
      password: '123',
      metaType: 'doctor',
    },
  ];
  const {
    data: { results: randomUsers },
  } = await axios.get('https://randomuser.me/api', {
    params: {
      results: 700,
      nat: 'us',
      seed: 'randomUsers',
    },
  });

  const randomUserPatientData = randomUsers.slice(0, 200);
  const randomUserDoctorData = randomUsers.slice(200);

  const userPatientData = [];
  const userDoctorData = [];

  populateArray(randomUserPatientData, userPatientData, 'patient');
  populateArray(randomUserDoctorData, userDoctorData, 'doctor');

  userPatientData[0] = { ...userPatientData[0], ...testPatientData[0] };
  userPatientData[1] = { ...userPatientData[1], ...testPatientData[1] };
  userDoctorData[0] = { ...userDoctorData[0], ...testDoctorData[0] };
  userDoctorData[1] = { ...userDoctorData[1], ...testDoctorData[1] };

  return [userPatientData, userDoctorData];
};
