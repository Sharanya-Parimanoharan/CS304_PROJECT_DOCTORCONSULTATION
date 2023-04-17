import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.number(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  email: faker.internet.email(),
  name: faker.name.firstName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  // date: faker.internet.date(),
  // time: faker.internet.time(),
  role: sample([
    'Surgen',
    'Neurologist',
    'Dermatologist',
    'General Physician',
    'Surgen',
    'Dermatologist',
    'Surgen',
    'Cardiologist',
    'Neurologist',
    'General Physician'
  ]),
  education:sample([
    'MBBS',
    'MBBS MD',
    'MBBS',
    'MBBS MD',
    'MBBS MS',
    'MBBS MS',
    'MBBS',
    'MBBS MD',
    'MBBS',
    'MBBS'
  ])
}));

export default users;
