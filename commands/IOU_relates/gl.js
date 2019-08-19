/* eslint-disable no-undef */
/* eslint-disable prefer-template */
const db = require(__basedir + '/coldsewoobot.js');
const MedData = db.collection('MedData');
const globalVar = require(__basedir + '/globalVar.js');
const { Global } = globalVar;
const numeral = require('numeral');

exports.run = (client, message, args) => {
	const meddata = {};
	MedData.get()
		.then(async docs => {
			await docs.forEach(doc => {
				meddata[doc.id] = doc.data();
			});
		})
		.then(() => {
			if (args[0] === 'help' || !args[0] || !args[1]) {
				// const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
				// const guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
				let color;
				for (let i = 0; i < 6; i += 1) {
					if (message.member.roles.find(role => role.name === Global.guildRole[i])) {
						color = Global.guildColor[i];
					}
				}
				if (!color) color = Global.guildColor[6];
				message
					.reply({
						embed: {
							color: `${color}`,
							author: {
								name: 'Guild Building Level Upgrade Calculation',
							},
							title: 'Calculates the guild building level you can reach with given stone amount',
							fields: [
								{
									name: 'Available Contents (use ~ before the desired command)\n',
									value: `
How to use : ~gl [Current Building Level] [StoneAmount] [NumBuildings]
             The number of buildings is optional and set default at 1 (if not given)
ex) ~gl 200 300B 3 - Start from 200lv, calculates the level you can reach for each of the 3 buildings with 300B stone (Rounded Down to tenth).

`,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',
							},
						},
					})
					.catch(err => console.error(err));
				return;
			}

			const currentLv = args[0];
			const numBuildings = args[2] ? args[2] : 1;
			let resourceAvailable = args[1];
			if (
				resourceAvailable === undefined ||
				resourceAvailable.toLowerCase().match(/[mbt]/) === null ||
				resourceAvailable.match(/\D/g).length > 1
			) {return message.reply('wrong format!');}

			resourceAvailable = numeral(args[1].toLowerCase()).value() / numBuildings;
			let milestone = Math.floor(currentLv / 10) + 1;
			let stoneReqtoMilestone = meddata[milestone * 10].StoneSum;
			const currentLvRes = meddata[currentLv].StoneSum;
			if (stoneReqtoMilestone - currentLvRes > resourceAvailable) {return message.reply('You cannot upgrade buildings anymore');}
			let limit = 1;
			while (stoneReqtoMilestone - currentLvRes < resourceAvailable) {
				milestone += 1;
				stoneReqtoMilestone = meddata[milestone * 10].StoneSum;
				if (limit > 20) return message.reply('Calculation limit exceeded, please specify the conditions more.');
				limit += 1;
			}
			milestone -= 1;
			stoneReqtoMilestone = meddata[milestone * 10].StoneSum;
			const remains = numeral((resourceAvailable - stoneReqtoMilestone + currentLvRes) * numBuildings)
				.format('0.0a')
				.toUpperCase();
			message.channel.send(`Each building to ${milestone * 10} level with ${remains} stone remaining`);
		});
};
