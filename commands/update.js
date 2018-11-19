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

	https.get('https://docs.google.com/spreadsheets/d/' + id + '/export?format=' + format + '&id=' + id + '&gid=' + sheetId, function(resp) {

		let body = '';

		resp
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
				const dateInfo =
        [
        	time.getFullYear(),
        	parseInt(time.getMonth()) + 1,
        	time.getDate(),
        	time.getHours(),
        	time.getMinutes(),
        ];
				json.push(dateInfo);
				fs.writeFileSync(path.resolve(__dirname, '..', 'json', 'guildsheet.json'), JSON.stringify(json, null, 2));
				message.reply(`\`\`\`prolog
  updated Guild Information on ${time}\`\`\``);

			});

	});

	function ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint16Array(buf));
	}

};
