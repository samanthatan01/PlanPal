const pool = require("../db/db");

// get guestlist for a selected event
const getGuestlist = async (req, res) => {
  try {
    const client = await pool.connect();
    // get logged in user personnel_id

    const loggedInUserId = req.decoded.id;
    // get event WHERE event_id in req.params AND host_id = req.decoded.id
    const event_id = parseInt(req.params.id);

    const guestlist = await client.query(
      "SELECT e.event_id, e.host_id, eg.guest_id, p.first_name, p.last_name, p.email, p.contact, eg.is_attending, eg.diet FROM events e INNER JOIN event_guests eg ON e.event_id = eg.event_id INNER JOIN personnel p ON p.personnel_id = eg.guest_id WHERE e.event_id = $1 AND e.host_id = $2",
      [event_id, loggedInUserId]
    );

    client.release();

    if (guestlist.rows.length === 0) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised user" });
    }
    res.status(200).json(guestlist.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "fail to retrieve guestlist" });
  }
};

// host to update guest attendance for the selected event
const updateGuestAttendance = async (req, res) => {
  try {
    const client = await pool.connect();

    // get logged in user personnel_id
    const loggedInUserId = req.decoded.id;

    // get host_id from event data to compare with loggedInUserId to protect route
    const { event_id } = req.body;
    const hostData = await client.query(
      "SELECT host_id FROM events where event_id = $1",
      [event_id]
    );
    const hostId = hostData.rows[0].host_id;

    // if host_id != loggedInUserId, unauthorised to update. else proceed to update event_guests table via guest_id, change is_attending boolean values
    if (hostId != loggedInUserId) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised user" });
    }

    const { guest_id, is_attending } = req.body;
    await client.query(
      "UPDATE event_guests SET is_attending = $1 WHERE event_id = $2 AND guest_id = $3",
      [is_attending, event_id, guest_id]
    );
    client.release();
    res
      .status(200)
      .json({ status: "ok", msg: "guest attendance updated successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "fail to update guest attendance" });
  }
};

// host to update guest information for the selected event
const updateGuestInfo = async (req, res) => {
  try {
    const client = await pool.connect();

    // get logged in user personnel_id
    const loggedInUserId = req.decoded.id;

    // get host_id from event data to compare with loggedInUserId to protect route
    const { event_id } = req.body;
    const hostData = await client.query(
      "SELECT host_id FROM events where event_id = $1",
      [event_id]
    );
    const hostId = hostData.rows[0].host_id;

    // if host_id != loggedInUserId, unauthorised to update.
    if (hostId != loggedInUserId) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised user" });
    }

    // else proceed to update personnel table via (personnel_id) guest_id, change first_name, last_name, email, contact, diet

    // host to update guest information via one event guestlist and this will update the guest data for all guestlists associated with this guest in the db
    // update guest information via personnel table
    const { guest_id, first_name, last_name, email, contact, diet } = req.body;
    await client.query(
      "UPDATE personnel SET first_name = $1, last_name = $2, email = $3, contact = $4 WHERE personnel_id = $5",
      [first_name, last_name, email, contact, guest_id]
    );

    // however, for diet specifically, the guest's dietary preference in one event is independent of the dietary preference in another event
    // update diet on the specific guestlist only, the dietary preference of the same guest in another event will not change
    await client.query(
      "UPDATE event_guests SET diet = $1 WHERE guest_id = $2 AND event_id = $3",
      [diet, guest_id, event_id]
    );

    client.release();
    res
      .status(200)
      .json({ status: "ok", msg: "guest information updated successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "fail to update guest information" });
  }
};

// host to remove guest from the selected event
const deleteGuestFromEvent = async (req, res) => {
  try {
    const client = await pool.connect();

    // get logged in user personnel_id
    const loggedInUserId = req.decoded.id;

    // get host_id from event data to compare with loggedInUserId to protect route
    const { event_id } = req.body;
    const hostData = await client.query(
      "SELECT host_id FROM events where event_id = $1",
      [event_id]
    );
    const hostId = hostData.rows[0].host_id;

    // if host_id != loggedInUserId, unauthorised to update.
    if (hostId != loggedInUserId) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised user" });
    }

    // else proceed to delete guest from event_guests table where event_id = $1 and guest_id = $2
    const { guest_id } = req.body;
    await client.query(
      "DELETE FROM event_guests WHERE event_id = $1 AND guest_id = $2",
      [event_id, guest_id]
    );

    client.release();
    res.status(200).json({ status: "ok", msg: "guest removed from event" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fail to remove guest" });
  }
};

module.exports = {
  getGuestlist,
  updateGuestAttendance,
  updateGuestInfo,
  deleteGuestFromEvent,
};
