const numeral = require('numeral');
const global = require('../global.js');
const Global = global.Global;
const IOU_guild = global.IOU_guild;

exports.run = (client, message, args) => {
	let color;
	for (let i = 0; i < 6; i++) {
		if(message.member.roles.find(role => role.name === Global.guildRole[i])) {color = Global.guildColor[i];}
	}
	if (!color) color = Global.guildColor[6];
	if (args[0] === 'help' || !args[0]) {
		message.channel.send({ embed: {
			color: `${color}`,
			author: {
				name: 'Personal',
			},
			title: 'Calculates stone amount required for personal guild level',
			fields: [
				{
					name: 'Available Contents (use ~ before the desired command)\n',
					value: `
How to use : ~personal from to
ex) ~personal 100 200 - Stone EXP required from lv 100 to lv 200

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
	if (args[0] - args[1] > 0 || (!args[0] && args[0] != 0) || !args[1]) {
		message.channel.send('Please set the appropriate Range (from / to)');
		return;
	}
	else
	if (args[0] > 1000 || args[1] > 1000) {
		message.channel.send('Personal Level cannot be more than 1000');
		return;
	}
	else {
		const personal = IOU_guild[0]['meta'][args[1]]['GXP_Sum'] - IOU_guild[0]['meta'][args[0]]['GXP_Sum'];
		const personal2 = numeral(personal).format('0.0a');
		const personal3 = personal2.toUpperCase();
		message.channel.send(personal3);
	}
};
