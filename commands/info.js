const global = require('../global.js');
const Global = global.Global;
const guildinfo = global.Guildinfo;
exports.run = (client, message, args) => {
	const guildsheet = requireUncached('../json/guildsheet.json');

	if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.channel.send('You are not CnC member!');
	// const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	// let guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
	let color;
	for (let i = 0; i < 6; i++) {
		if(message.member.roles.find(role => role.name === Global.guildRole[i])) {color = Global.guildColor[i];}
	}
	if (!color) color = Global.guildColor[6];
	if (!guildsheet[8][2] || (guildsheet[8][1] == 11 && guildsheet[8][2] == 19)) return message.channel.send(' *Please* **~update** *first*');


	if (!args[0]) {
		message.channel.send({ embed: {
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
	const guildnameInput = args.slice().shift().toLowerCase();
	let guildname;
	for (let i = 0; i < 6 ; i++) {
		if(Global.guildnameList[i].indexOf(guildnameInput) >= 0) {
			guildname = i;
		}
	}
	if (guildname == undefined) {
		{
				if (guildnameInput === 'help') {
					message.channel.send({ embed: {
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
					message.channel.send(':heart:');
					return;
				}
				else {
					message.channel.send('You must type correct guild name (See ~info help)');
					return;
				}
		}
	}

	if (guildnameInput === 'help') {
		return;
	}
	message.channel.send({ embed: {
		color: `${guildinfo[0][guildname][0]['guild_color']}`,
		author: {
			name: 'Cows \'n\' Chaos',

		},
		title: `**${guildinfo[0][guildname][0]['guild_name']} guild information**`,
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
			text: `Last updated on ${Global.monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`,

		},
	},
	}).catch(function(err) {
		console.error(err);
	});

	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}
};
