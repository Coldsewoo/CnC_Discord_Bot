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


		if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.reply('You are not CnC member!');
		const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
		let guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
		let color;
		for (let i = 0; i < 6; i++) {
			if(message.member.roles.find(role => role.name === guildname[i])) {color = guildcolor[i];}
		}
		if (!color) color = guildcolor[6];
		const monthEng = ['XD', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		if (!guildsheet[8][2])
{
	return message.reply(' *Please* **~update** *first*');
} else
{
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
}

		if (!args[0]) {
			message.reply({ embed: {
				color: `${color}`,
				author: {
					name: 'Info',

				},
				title: 'Shows Guild Level Information',
				fields: [
					{
						name: 'Available Contents (use ~ before the desired command)',
						value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~info AO, ~info Alwaysonline
    `,
					},
				],

				footer: {
					icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

				},
			},
			}).catch(function(err) {
				console.error(err);
			});
			return;
		}
		const guildnameInput = args.shift().toLowerCase();
		if (['br', 'burningrage', 'burning'].indexOf(guildnameInput) >= 0) {
			guildname = 0;
		}
		else
		if (['cs', 'comingsoon', 'coming'].indexOf(guildnameInput) >= 0) {
			guildname = 1;
		}
		else
		if (['tc', 'thecollectives', 'the'].indexOf(guildnameInput) >= 0) {
			guildname = 2;
		}
		else
		if (['im', 'imaginarium'].indexOf(guildnameInput) >= 0) {
			guildname = 3;
		}
		else
		if (['fa', 'freshair', 'fresh'].indexOf(guildnameInput) >= 0) {
			guildname = 4;
		}
		else
		if (['ao', 'alwaysonline', 'always'].indexOf(guildnameInput) >= 0) {
			guildname = 5;
		}
		else
		if (guildnameInput === 'help') {
			message.reply({ embed: {
				color: `${color}`,
				author: {
					name: 'Info',

				},
				title: 'Shows Guild Level Information',
				fields: [
					{
						name: 'Available Contents (use ~ before the desired command)',
						value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~info AO, ~info Alwaysonline
    `,
					},
				],

				footer: {
					icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

				},
			},
			}).catch(function(err) {
				console.error(err);
			});
		}
		else
		if (guildnameInput === 'cold' || guildnameInput === 'coldsewoo') {
			message.reply(':heart:');
			return;
		}
		else {
			message.reply('You must type correct guild name (See ~info help)');
			return;
		}

		if (guildnameInput === 'help') {
			return;
		}
		else {
			if(!guildsheet[8]) {
				message.reply(' *Please* **~update** *first*');
				return;
			}

			message.reply({ embed: {
				color: `${guildinfo[guildname][0]['guild_color']}`,
				author: {
					name: 'Cows \'n\' Chaos',

				},
				title: `**${guildinfo[guildname][0]['guild_name']} guild information**`,
				fields: [
					{
						name: '**             Building                         Level**       ',
						value: `\`\`\`css
 Guild Level  -    ${guildsheet[guildname][2]} \n Wishing Well -    ${guildsheet[guildname][3]}
 Stable       -    ${guildsheet[guildname][4]} \n Fortress     -    ${guildsheet[guildname][5]}
 Bank         -    ${guildsheet[guildname][6]} \n Sawmill      -    ${guildsheet[guildname][7]}
 Sac Tower    -    ${guildsheet[guildname][8]} \n Warehouse    -    ${guildsheet[guildname][9]}
 Altar        -    ${guildsheet[guildname][10]} \n Library      -    ${guildsheet[guildname][11]}
 Aquatic      -    ${guildsheet[guildname][12]} \n Space Aca.   -    ${guildsheet[guildname][13]} \`\`\`\`\`\`prolog\n  Total Stone - ${guildsheet[guildname][35]} \`\`\``,
					},
				],

				footer: {
					icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: `Last updated on ${monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`,

				},
			},
			}).catch(function(err) {
				console.error(err);
			});

		}

	});
};
