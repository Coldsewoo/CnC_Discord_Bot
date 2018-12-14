const https = require('https');
const path = require('path');
const fs = require('fs');

const format = 'tsv';         // Format you'd like to parse. `tsv` or `csv`
const id = '13ryAftYe7ptatfaGRcAg-XQtWX3PKeATToiV_oLxS_0'; // The Google Sheet ID found in the URL of your Google Sheet.
const sheetId = 407554068;            // The Page ID of the Sheet you'd like to export. Found as `gid` in the URL.


exports.run = (client, message, args) => {
	if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.reply('You are not CnC member!');
	message.reply(`\`\`\`prolog
  Now trying to Update information...\`\`\``);

	https.get('https://docs.google.com/spreadsheets/d/' + id + '/export?format=' + format + '&id=' + id + '&gid=' + sheetId, async function(resp) {

		let body = '';

		await resp
			.on('data', function(data) {

				body += ab2str(data);

			})
			.on('end', function() {

				const json = [];
				const rows = body.split(/\r\n/i);
				if (rows[0].split(/\t/i)[2] === 0 || rows[0].split(/\t/i)[2] === '') return message.reply('ERROR! Please ~update once again.');

				for (let i = 0; i < rows.length; i++) {
					json.push(rows[i].split(/\t/i));
				}
				const clientDate = new Date();
				const time = new Date(clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000) + 32400000);
				const timeJP = time.toLocaleString('ja-JP')
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


				json.push(dateInfo);
				fs.writeFileSync(path.resolve(__dirname, '..', 'json', 'guildsheet.json'), JSON.stringify(json, null, 2));
				message.reply(`\`\`\`prolog
  updated Guild Information on ${timeJP} GMT+09 (Japan Standard Time)\`\`\``);

			});

	});

	function ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint16Array(buf));
	}

};
