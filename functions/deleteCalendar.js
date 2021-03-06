const functions = require('firebase-functions');
const Promise = require('bluebird');
const googleClient = require('./apiClients/googleClient.js');
const deleteGoogleCalendar = require('./utils/deleteGoogleCalendar.js');

const deleteCalendar = functions.https.onRequest((request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  const OAuthToken = request.body.OAuthToken;
  const calendarId = request.body.calendarId;

  const googleClientAuthorize = Promise.promisify(googleClient.authorize);
  googleClientAuthorize(OAuthToken, deleteGoogleCalendar, calendarId)
    .then(response.end())
    .catch(e => console.log(e));
});

module.exports = deleteCalendar;
