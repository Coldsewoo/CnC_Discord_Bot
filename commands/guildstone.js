const fs = require('fs');
const path = require('path');
const numeral = require('numeral');


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
		if (args[0] === 'help' || !args[0]) {
			const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
			let guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
			let color;
			for (let i = 0; i < 6; i++) {
				if(message.member.roles.find(role => role.name === guildname[i])) {color = guildcolor[i];}
			}
			if (!color) color = guildcolor[6];
			message.reply({ embed: {
				color: `${color}`,
				author: {
					name: 'Guildstone',
				},
				title: 'Calculates stone amount required for guild level',
				fields: [
					{
						name: 'Available Contents (use ~ before the desired command)\n',
						value: `
How to use : ~guildstone from to
ex) ~guildstone 100 200 - stone req. from lv 100 to lv 200

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
		else {parseInt(args, 10);}
		if (args[0] - args[1] > 0 || !args[0] || !args[1]) {
			message.reply('Set the appropriate Range (from / to)');
			return;
		}
		else
		if (args[0] > 1000 || args[1] > 1000) {
			message.reply('Guild Level cannot be more than 1000');
			return;
		}
		else {
			const personal = IOU_guild['meta'][args[1]]['stone_sum'] - IOU_guild['meta'][args[0]]['stone_sum'];
			const personal2 = numeral(personal).format('0a');
			const personal3 = personal2.toUpperCase();
			message.reply(personal3);
		}

	});
};
