const pool = require("../db/db");

// logged in user to create an event
const createEvent = async (req, res) => {
  try {
    const client = await pool.connect();

    const { title, date, time, address, response_deadline } = req.body;
    const host_id = req.decoded.id;

    await client.query(
      "INSERT INTO events (title, date, time, address, response_deadline, host_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, date, time, address, response_deadline, host_id]
    );

    client.release();
    res.status(200).json({ status: "ok", msg: `event created` });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to create new event" });
  }
};

// get all events where logged in user is the host
const getAllEventsHostedByUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const host_id = req.decoded.id;
    const eventsCreated = await client.query(
      "SELECT * FROM events WHERE host_id = ($1)",
      [host_id]
    );
    client.release();
    // console.log(eventsCreated);
    res.status(200).json(eventsCreated.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to retrieve event" });
  }
};

// allow host to update event
const updateEvent = async (req, res) => {
  try {
    const client = await pool.connect();
    // define personnel_id of logged in user
    const loggedInUserId = req.decoded.id;

    // retrieve event data by id
    const event_id = parseInt(req.params.id);

    const eventData = await client.query(
      "SELECT * FROM events WHERE event_id = $1",
      [event_id]
    );

    // if personnel_id of logged in user is not the host_id of the event, return unauthorised message. else proceed to update event
    if (eventData.rows[0].host_id != loggedInUserId) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised user" });
    }

    const { title, date, time, address, response_deadline } = req.body;
    await client.query(
      "UPDATE events SET title = $1, date = $2, time = $3, address = $4, response_deadline = $5 WHERE event_id = $6",
      [title, date, time, address, response_deadline, event_id]
    );

    client.release();
    res.status(200).json({ status: "ok", msg: "event updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to update event" });
  }
};

// allow host to delete (change is_active to false)
const deleteEvent = async (req, res) => {
  try {
    const client = await pool.connect();
    // define personnel_id of logged in user
    const loggedInUserId = req.decoded.id;

    // retrieve event data by id
    const event_id = parseInt(req.params.id);

    const eventData = await client.query(
      "SELECT * FROM events WHERE event_id = $1",
      [event_id]
    );

    // if personnel_id of logged in user is not the host_id of the event, return unauthorised message. else proceed to update event
    if (eventData.rows[0].host_id != loggedInUserId) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised user" });
    }

    const { is_active } = req.body;
    await client.query("UPDATE events SET is_active = $1 WHERE event_id = $2", [
      is_active,
      event_id,
    ]);

    client.release();
    res.status(200).json({ status: "ok", msg: "event deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to update event" });
  }
};

module.exports = {
  createEvent,
  getAllEventsHostedByUser,
  updateEvent,
  deleteEvent,
};
