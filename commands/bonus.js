const global = require('../global.js');
const Global = global.Global;
const guildinfo = global.Guildinfo;

exports.run = (client, message, args) => {
	if (Global.cnc_opened.indexOf(message.channel.id) > -1) {
		if (Global.testChannels.indexOf(message.channel.id) == -1) {
			message.delete();
			message.reply("You cannot use this command in this channel")
			setTimeout(() => {
				message.channel.fetchMessages({
					limit: 3
				}).then(collected => {
					collected.forEach(msg => {
						if (msg.author.bot) msg.delete();
					});
				});
			}, 3000);
			return;
		}
	}
	var guildsheet = requireUncached('../json/guildsheet.json');
	if (!guildsheet[8][2] || (guildsheet[8][1] == 11 && guildsheet[8][2] == 19)) return message.channel.send(' *Please* **~update** *first*');
	if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.channel.send('You are not CnC member!');
	//	const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	//	let guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
	let color;
	for (let i = 0; i < 6; i++) {
		if (message.member.roles.find(role => role.name === Global.guildRole[i])) {
			color = Global.guildColor[i];
		}
	}
	if (!color) color = Global.guildColor[6];

	if (!args[0]) {
		message.channel.send({
			embed: {
				color: `${color}`,
				author: {
					name: 'Bonus',

				},
				title: 'Shows Guild Bonus (except for personal guild bonus)',
				fields: [{
					name: 'Available Contents (use ~ before the desired command)\n',
					value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~bonus AO, ~bonus Alwaysonline
    `,
				}, ],

				footer: {
					icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

				},
			},
		}).catch(function(err) {
			console.error(err);
		});
		return;
	}
	const guildnameInput = args.slice().shift().toLowerCase();
	let guildname;
	for (let i = 0; i < 6; i++) {
		if (Global.guildnameList[i].indexOf(guildnameInput) >= 0) {
			guildname = i;
		}
	}
	if (guildname == undefined) {
		if (guildnameInput === 'help') {
			return message.channel.send({
				embed: {
					color: `${color}`,
					author: {
						name: 'Bonus',

					},
					title: 'Shows Guild Bonus (except for personal guild bonus)',
					fields: [{
						name: 'Available Contents (use ~ before the desired command)\n',
						value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~bonus AO, ~bonus Alwaysonline
    `,
					}, ],

					footer: {
						icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
						text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

					},
				},
			}).catch(function(err) {
				console.error(err);
			});
		} else {
			message.channel.send('You must type correct guild name (See ~bonus help)');
			return;
		}
	}

	{
		if (!guildsheet[8]) {
			message.channel.send(' *Please* **~update** *first*');
			return;
		}
		message.channel.send({
			embed: {
				color: `${guildinfo[0][guildname][0]['guild_color']}`,
				author: {
					name: 'Cows \'n\' Chaos',

				},
				title: `**${guildinfo[0][guildname][0]['guild_name']} Guild Information**`,
				fields: [{
					name: '**              Name                           Bonus**',
					value: `\`\`\`prolog
Sac. Exp      -  ${guildsheet[guildname][14]}
Pet Damage    -  ${guildsheet[guildname][15]}
Gold Rate     -  ${guildsheet[guildname][16]}
XP Rate       -  ${guildsheet[guildname][17]}
Wood Damage   -  ${guildsheet[guildname][18]}
Wood Yield    -  ${guildsheet[guildname][19]}
Stone Chance  -  ${guildsheet[guildname][20]}
Stone Yield   -  ${guildsheet[guildname][21]}
Fish Value    -  ${guildsheet[guildname][22]}
Card Value    -  ${guildsheet[guildname][23]}
PetArena Dmg  -  ${guildsheet[guildname][24]}
Pet Training  -  ${guildsheet[guildname][25]}
Asc Points    -  ${guildsheet[guildname][26]}
Leg Points    -  ${guildsheet[guildname][27]}
Challenge Dmg -  ${guildsheet[guildname][28]}
ShipArena Dmg -  ${guildsheet[guildname][29]}
Beast Dmg     -  ${guildsheet[guildname][30]}
\`\`\``,
				}, ],

				footer: {
					icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: `Last updated on ${Global.monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`,

				},
			},
		}).catch(function(err) {
			console.error(err);
		});

	}

	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}
};