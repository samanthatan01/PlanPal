# PlanPal

Forget about tracking your event guestlist using a spreadsheet. With PlanPal, you can host multiple events and manage the RSVP all in one place.

## Getting Started

This is a PERN-stack application, using PostgreSQL and pg-admin as a driver.

### Backend Configuration

Go to the project backend folder and create a new package.json file

`npm init -y`

Install the packages:

`npm i dotenv express-validator jsonwebtoken bcrypt uuid cors helmet express-rate-limit`

For postgresql database, install the following:
`npm i pg-admin`

Create your .env and add the database path (like below for localhost)

`pguser=<YOUR_PGADMIN_USERNAME>`<br>
`pgpassword=<YOUR_PGADMIN_PASSWORD>`<br>
`host_name='localhost'`<br>
`port=5432,`<br>
`db_name='planpal',`<br>
`ACCESS_SECRET=<YOUR_ACCESS_SECRET>`<br>
`REFRESH_SECRET=<YOUR_REFRESH_SECRET>`<br>

NOTE: The ACCESS and REFRESH secrets were generated using https://www.random.org/strings/

### Frontend Configuration

Create .env file and add the following:

`VITE_SERVER=http://localhost:5001`

Install the packages:

Go to the project frontend folder and install react-app: <br/>`npm i`

Install react-router-dom:
<br/> `npm install react-router-dom`

Install react-pro-sidebar: <br/>
`npm install react-pro-sidebar`

Install jwt-decode:<br/> `npm i jwt-decode`

## App Features

### Main Landing Page

![main landing page](Frontend/public/landing-page.png)

### Login and Registration

![register account](Frontend/public/register.png)
![login](Frontend/public/login.png)

### Dashboard for all users

![dashboard](Frontend/public/dashboard.png)

### For hosts

#### Event Creation

![create new event](Frontend/public/create-new-event.png)

#### View All Events Created By Host

![view-all](Frontend/public/view-all-host-events.png)

#### View Guestlist

![guestlist](Frontend/public/guestlist.png)

#### Update Event Details

![update event](Frontend/public/update-modal.png)

### For guests

#### Search for event by event code (id)

![search for event](Frontend/public/search-event-code.png)

#### Event RSVP Page

![event page](Frontend/public/event-page.png)

#### View All Upcoming Events For Guest

![upcoming events](Frontend/public/upcoming-events.png)

## Technologies Used

- HTML
- CSS
- JavaScript
- Express.js
- Node.js
- React
- PostgreSQL (raw SQL with pg-admin library)

## Future Enhancements

- Allow users to sync up wuth Google Calendar or iCS app
- Allow users to pinpoin specifia locations
