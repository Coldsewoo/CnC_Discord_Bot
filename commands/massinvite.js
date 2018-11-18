const fs = require('fs');
const path = require('path');

exports.run = (client, message, args) => {
	fs.readFileAsync = function(fileName) {
		return new Promise(function(resolve, reject) {
			try {
				fs.readFile(fileName, function(err, buffer) {
					if (err) reject(err); else resolve(buffer);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	};

	function getJSONAsync(Name) {
		return fs.readFileAsync(path.join(__dirname, '..', 'json', Name + '.json'));
	}

	const JSONnames = ['guildinfo', 'IOU_guild', 'guildsheet'].map(getJSONAsync);
	Promise.all(JSONnames).then(function(JSONBuffers) {
		const guildinfo = JSON.parse(JSONBuffers[0]);
		const IOU_guild = JSON.parse(JSONBuffers[1]);
		const guildsheet = JSON.parse(JSONBuffers[2]);
		if (!message.member.roles.find(role => role.name === 'Bot_controler') && !message.member.roles.find(role => role.name === 'Bot Controller')) return;

		message.delete();
		message.channel.fetchPinnedMessages()
			.then(collected => {
				collected.forEach(msg => {
					if (msg.author.bot) msg.delete();
				});
			}).catch(console.error);


		const monthEng = ['XD', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const result = guildsheet[8][2] % 10;
		if (result === 1) {
			guildsheet[8][2] += 'th';
		}
		else
		if (result === 2) {
			guildsheet[8][2] += 'nd';
		}
		else
		if (result === 3) {
			guildsheet[8][2] += 'rd';
		}
		else {
			guildsheet[8][2] += 'th';
		}
		if (guildsheet[8][3] > 11) {
			if (guildsheet[8][3] === 12) {
				guildsheet[8][4] += 'PM';
				if (guildsheet[8][4] < 10) guildsheet[8][4] = '0' + guildsheet[8][4];
			}
			else {
				guildsheet[8][3] = guildsheet[8][3] - 12;
				if (guildsheet[8][4] < 10) guildsheet[8][4] = '0' + guildsheet[8][4];
				guildsheet[8][4] += 'PM';
				if (guildsheet[8][3] < 10) guildsheet[8][3] = '0' + guildsheet[8][3];
			}
		}
		else {
			if (guildsheet[8][4] < 10) guildsheet[8][4] = '0' + guildsheet[8][4];
			guildsheet[8][4] += 'AM';
			if (guildsheet[8][3] < 10) guildsheet[8][3] = '0' + guildsheet[8][3];
		}

		async function massinvites() {
			await message.channel.send({ embed: {
				color: 16398164,
				author: {
					name: 'Cows \'n\' Chaos',

				},
				title: `**  ${guildinfo[5][0]['guild_name']}**`,
				fields:
          [
          	{
          		name: '**  Mass Invite Updater**',
          		value: 'Mass Invites sent. If you need to be Added to the List,TAG or send DM to @Coldsewoo or link your Multicalc in CnC Utility Sheet. (https://docs.google.com/spreadsheets/d/1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo/edit#gid=1546377489)',
          	},
          	{
          		name: '**         Building                      Level**',
          		value: `\`\`\`css
 Guild Level  - ${guildsheet[5][2]}    \n Wishing Well - ${guildsheet[5][3]}
 Stable       - ${guildsheet[5][4]}    \n Fortress     - ${guildsheet[5][5]}
 Bank         - ${guildsheet[5][6]}    \n Sawmill      - ${guildsheet[5][7]}
 Sac Tower    - ${guildsheet[5][8]}    \n Warehouse    - ${guildsheet[5][9]}
 Altar        - ${guildsheet[5][10]}    \n Library      - ${guildsheet[5][11]}
 Aquatic      - ${guildsheet[5][12]}    \n Space Aca.   - ${guildsheet[5][13]}     \`\`\`\`\`\`prolog\n Total Stone - ${guildsheet[5][35]}\`\`\``,
          	},
          ],
				footer: {
					icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: `Last updated on ${monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`,
				},
			},
			});
		}
		massinvites().then(() => {
			message.channel.fetchMessages({ limit: 1 })
				.then(collected => {
					collected.forEach(msg => {
						if (msg.author.bot) msg.pin();
					});
				}).catch(console.error);
		});
	});
};
