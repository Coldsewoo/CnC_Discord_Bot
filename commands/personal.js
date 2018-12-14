const fs = require('fs');
const path = require('path');
const numeral = require('numeral');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;

exports.run = (client, message, args) => {
	var guildsheet = requireUncached('../json/guildsheet.json');



	//	const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	//	const guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
		let color;
		for (let i = 0; i < 6; i++) {
			if(message.member.roles.find(role => role.name === Global.guildname[i])) {color = Global.guildcolor[i];}
		}
		if (!color) color = Global.guildcolor[6];
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
		if (args[0] - args[1] > 0 || !args[0] || !args[1]) {
			message.channel.send('Please set the appropriate Range (from / to)');
			return;
		}
		else
		if (args[0] > 1000 || args[1] > 1000) {
			message.channel.send('Personal Level cannot be more than 1000');
			return;
		}
		else {
			const personal = IOU_guild[0]['meta'][args[1]]['personal_sum'] - IOU_guild[0]['meta'][args[0]]['personal_sum'];
			const personal2 = numeral(personal).format('0.0a');
			const personal3 = personal2.toUpperCase();
			message.channel.send(personal3);
		}
		function requireUncached(module) {
			delete require.cache[require.resolve(module)];
			return require(module);
		}
};
