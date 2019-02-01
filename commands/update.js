const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path = require('path');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


exports.run = (client, message, args) => {
  message.delete();
  message.reply(`\`\`\`prolog
  Now trying to Update information...\`\`\``);
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listGuildInfo);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  function listGuildInfo(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
      spreadsheetId: '1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo',
      range: 'Guildsheet.json!A1:AJ8',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      var rows = res.data.values;
      if (rows.length) {
        if (rows[0][2] === 0 || rows[0][2] === '') return message.reply('ERROR! Please ~update once again.');
        const clientDate = new Date();
        const time = new Date(clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000) + 32400000);
        const timeJP = time.toLocaleString('ja-JP');
        const dateInfo =
          [
            time.getFullYear(),
            parseInt(time.getMonth()) + 1,
            time.getDate(),
            time.getHours(),
            time.getMinutes(),
          ];
				/* year == dateInfo[0];
				 month == dateInfo[1];
				 date == dateInfo[2];
				 hours == dateInfo[3];
				 minutes == dateInfo[4]; */

        const result = dateInfo[2] % 10;
        if (result === 1) {
          dateInfo[2] += 'th';
        }
        else
          if (result === 2) {
            dateInfo[2] += 'nd';
          }
          else
            if (result === 3) {
              dateInfo[2] += 'rd';
            }
            else {
              dateInfo[2] += 'th';
            }
        if (dateInfo[3] > 11) {
          if (dateInfo[3] === 12) {
            if (dateInfo[4] < 10) dateInfo[4] = '0' + dateInfo[4];
            dateInfo[4] += 'PM';
          }
          else {
            dateInfo[3] = dateInfo[3] - 12;
            if (dateInfo[4] < 10) dateInfo[4] = '0' + dateInfo[4];
            dateInfo[4] += 'PM';
            if (dateInfo[3] < 10) dateInfo[3] = '0' + dateInfo[3];
          }
        }
        else {
          if (dateInfo[4] < 10) dateInfo[4] = '0' + dateInfo[4];
          dateInfo[4] += 'AM';
          if (dateInfo[3] < 10) dateInfo[3] = '0' + dateInfo[3];
        }


        rows.push(dateInfo);

        fs.writeFileSync(path.resolve(__dirname, '..', 'json', 'guildsheet.json'), JSON.stringify(rows, null, 2));
        message.reply(`\`\`\`prolog
  updated Guild Information on ${timeJP} GMT+09 (Japan Standard Time)\`\`\``);
      } else {
        console.log('No data found.');
      }
    });
  }




};
