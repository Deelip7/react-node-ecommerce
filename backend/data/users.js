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
  {
    name: 'Deelip',
    email: '1sadasdsdd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: '2saasddsdd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: '22adasdasdd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: '3sadadassd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: '4adas43adsdd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: '5sadasdd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: '6sa1dasdasd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: 'da1sdddsadddddd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: 'd141asdddsadddddd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: 'd234asdddsadddddd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: 'dasd234ddsadddddd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Deelip',
    email: 'dasd324324ddsadddddd@m.com',
    password: bcrypt.hashSync('1234', 10),
  },
];

export default users;
