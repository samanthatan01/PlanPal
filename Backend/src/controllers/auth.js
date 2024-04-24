const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db");

const register = async (req, res) => {
  try {
    const client = await pool.connect();
    // find if the email already exists in the db
    const { email } = req.body;
    const checkExistingUser = await client.query(
      "SELECT * FROM personnel WHERE email = ($1)",
      [email]
    );

    // if user email is true, return 'duplicated email'
    if (checkExistingUser.rowCount) {
      return res.status(400).json({ status: "error", msg: "Duplicated email" });
    }

    // otherwise, hash password + insert into personnel table new data
    const hash = await bcrypt.hash(req.body.password, 12);

    const { first_name, last_name, contact, diet } = req.body;

    await client.query(
      "INSERT INTO personnel (first_name, last_name, password, email, contact, diet) VALUES ($1, $2, $3, $4, $5, $6)",
      [first_name, last_name, hash, email, contact, diet]
    );

    client.release();
    res
      .status(200)
      .json({ status: "ok", msg: `User has been registered successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const client = await pool.connect();
    // find if the email exists in the db
    const { email } = req.body;
    const findUserEmail = await client.query(
      "SELECT * FROM personnel WHERE email = ($1)",
      [email]
    );

    // check whether the email/account exist in the database
    if (!findUserEmail.rowCount) {
      return res.status(400).json({ status: "error", msg: "Email not found" });
    }

    // query from db the personnel data based on email address
    const personnelData = await client.query(
      "SELECT * FROM personnel WHERE email = ($1)",
      [email]
    );

    //the following code check whether the password matches the one in the db
    const check = await bcrypt.compare(
      req.body.password,
      personnelData.rows[0].password
    ); //check entered password against db password
    if (!check) {
      console.error("invalid password or email");
      return res.status(401).json({ status: "error", msg: "Login failed" });
    }

    const claims = {
      id: personnelData.rows[0].personnel_id,
      email: personnelData.rows[0].email,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh, id: personnelData.rows[0].personnel_id });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Login failed" });
  }
};

module.exports = { register, login };