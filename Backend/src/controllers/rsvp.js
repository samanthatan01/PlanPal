const pool = require("../db/db");

// PUT/ SUBMIT RSVP
// logged in user added into the event guestlist after submitting a response
// guest to access the endpoint (event page) by event_id
// (add data into the event_guests table) logged in user will indicate attendance and dietary preference - specific to this event_id
const submitResponse = async (req, res) => {
  try {
    const client = await pool.connect();
    const event_id = req.params.id;
    const guest_id = req.decoded.id;
    const { diet, is_attending } = req.body;

    await client.query(
      "INSERT INTO event_guests (event_id, guest_id, diet, is_attending) VALUES ($1, $2, $3, $4)",
      [event_id, guest_id, diet, is_attending]
    );
    client.release();
    res.status(200).json({ status: "ok", msg: "response saved" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to submit response" });
  }
};
// GET all events that the user has RSVPed for, regardless of attendance
// i.e fetch all events where req.decoded.id = guest_id on event_guests table
const getEventsForGuest = async (req, res) => {
  try {
    const client = await pool.connect();
    const guest_id = req.decoded.id;

    const allEventsForGuest = await client.query(
      "SELECT e.event_id, e.title, e.date, e.time, e.address, e.host_id, eg.is_attending, eg.diet FROM events e INNER JOIN event_guests eg ON e.event_id = eg.event_id INNER JOIN personnel p ON p.personnel_id = eg.guest_id WHERE eg.guest_id = $1",
      [guest_id]
    );

    client.release();
    res.status(200).json(allEventsForGuest.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to retrieve events" });
  }
};

// UPDATE/PATCH RSVP response
const updateResponse = async (req, res) => {
  try {
    const client = await pool.connect();
    const event_id = req.params.id;
    const guest_id = req.decoded.id;
    const { diet, is_attending } = req.body;

    await client.query(
      "UPDATE event_guests SET diet = $1, is_attending = $2 where guest_id = $3 and event_id = $4",
      [diet, is_attending, guest_id, event_id]
    );

    client.release();
    res.status(200).json({ status: "ok", msg: "response updated" });
  } catch (error) {}
};

module.exports = { submitResponse, getEventsForGuest, updateResponse };
