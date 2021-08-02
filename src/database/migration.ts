import { poolPG } from './connection';

poolPG.on('connect', () => {
  console.log('connected to database');
});

//CREATE USER TABLE
const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  last_used DATE NOT NULL DEFAULT CURRENT_DATE,
  limit_rate INT NOT NULL DEFAULT 0)`;
  poolPG
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      poolPG.end();
    })
    .catch((err) => {
      console.log(err);
      poolPG.end();
    });
};

createUserTable();
