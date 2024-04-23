const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.pgusername,
  password: process.env.pgpassword,
  host: "localhost",
  port: 5432,
  database: "planpal",
});

module.exports = pool;
