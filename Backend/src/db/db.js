const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.pguser,
  password: process.env.pgpassword,
  host: process.env.host_name,
  port: process.env.port,
  database: process.env.db_name,
});

module.exports = pool;
