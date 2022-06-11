import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(2)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: sample([
    'Ali Yakdhane',
    'Jday Firas',
  ]),
  email: sample([
    'Jdayfiras@gmail.com', 
       'Yakdhanali97@gmail.com',

  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'active']),
  role: sample([
    'Admin',
    'User',
  ]),
}));

export default users;
