import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'a@m.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'Deelip',
    email: 'd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
];

export default users;
