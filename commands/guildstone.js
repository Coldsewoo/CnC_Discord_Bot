const numeral = require('numeral');
const global = require('../global.js');
const Global = global.Global;
const IOU_guild = global.IOU_guild;

exports.run = (client, message, args) => {
	if (args[0] === 'help' || !args[0]) {
	//	const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	//	const guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
		let color;
		for (let i = 0; i < 6; i++) {
			if(message.member.roles.find(role => role.name === Global.guildRole[i])) {color = Global.guildColor[i];}
		}
		if (!color) color = Global.guildColor[6];
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
		const personal = IOU_guild[0]['meta'][args[1]]['stone_sum'] - IOU_guild[0]['meta'][args[0]]['stone_sum'];
		const personal2 = numeral(personal).format('0.0a');
		const personal3 = personal2.toUpperCase();
		message.channel.send(personal3);
	}
};
