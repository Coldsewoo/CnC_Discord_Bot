const db = require(__basedir + '/coldsewooBOT.js');
const buildings = db.collection('buildings');
const path = require('path');
const globalVar = require(__basedir + '/globalVar.js');
const Global = globalVar.Global;
const guildinfo = globalVar.Guildinfo;

exports.run = (client, message, args) => {
	const gBuilding = {};
	buildings
		.get()
		.then(async docs => {
			await docs.forEach(doc => {
				gBuilding[doc.id] = doc.data();
			});
			const messageTime = new Date().getTime() / 1000;
			const storedTime = gBuilding['timeinfo']['timestamp'];
			const timeDiff = Math.abs(messageTime - storedTime);
			return Promise.resolve(timeDiff);
		})
		.then(timeDiff => {
			if (timeDiff > 3600 * 24) return message.reply('Please ~update');
			if (Global.cnc_opened.indexOf(message.channel.id) > -1) {
				if (Global.testChannels.indexOf(message.channel.id) == -1) {
					message.delete();
					message.reply('You cannot use this command in this channel');
					setTimeout(() => {
						message.channel
							.fetchMessages({
								limit: 3,
							})
							.then(collected => {
								collected.forEach(msg => {
									if (msg.author.bot) msg.delete();
								});
							});
					}, 3000);
					return;
				}
			}
			if (!message.member.roles.find(r => r.name === 'CnCmember')) {return message.channel.send('You are not CnC member!');}
			let color;
			for (let i = 0; i < 6; i++) {
				if (message.member.roles.find(role => role.name === Global.guildRole[i])) {
					color = Global.guildColor[i];
				}
			}
			if (!color) color = Global.guildColor[6];

			if (!args[0]) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Compare**',
							fields: [
								{
									name: 'Available Contents (use ~ before the desired command)\n',
									value: `\n\r
    ***Level*** - Guild Level, Wishing Well
    ***Pet*** - Stable Level, PetDmg, Pet Arena Dmg, Pet Training, Beast Damage
    ***Gold*** - Bank Level, Gold Rate
    ***Exp*** - Altar Level, EXP Rate
    ***Wood*** - Sawmill Level, Woodcutting Dmg, Woodcutting Yield
    ***Stone*** - Warehouse Level, +1 Stone Chance, Stone Yield
    ***Points*** - Fortress Level, Asc Points, Legendary Points
    ***Tower*** - Sacrifical Tower Level, Sacrifical Offering EXP
    ***Fish*** - Aquatic Research Level, Fish Value
    ***Cards*** - Library Level, Card Drop Amount
    ***Challenge*** - Challenge Damage
    ***Space*** - Space Academy Level, Space Arena HP/Damage

    ***ex) ~compare stone***
      \n\r
      `,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
				return;
			}
			const content = [];
			for (let i = 0; i < args.length; i++) {
				content.push(args[i].toLowerCase());
			}
			content.sort();
			if (['pet', 'stable'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Pet related bonus comparison**',
							fields: [
								{
									name: 'Stable Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Stable']}
Coming Soon     -  ${gBuilding['CS']['Stable']}
The Collectives -  ${gBuilding['TC']['Stable']}
Imaginarium     -  ${gBuilding['IM']['Stable']}
Fresh Air       -  ${gBuilding['FA']['Stable']}
Always Online   -  ${gBuilding['AO']['Stable']}\`\`\``,
								},
								{
									name: 'Pet Damage',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['PetDmg']}
Coming Soon     -  ${gBuilding['CS']['PetDmg']}
The Collectives -  ${gBuilding['TC']['PetDmg']}
Imaginarium     -  ${gBuilding['IM']['PetDmg']}
Fresh Air       -  ${gBuilding['FA']['PetDmg']}
Always Online   -  ${gBuilding['AO']['PetDmg']}\`\`\``,
								},
								{
									name: 'Pet Arena Damage',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['PetArenaDmg']}
Coming Soon     -  ${gBuilding['CS']['PetArenaDmg']}
The Collectives -  ${gBuilding['TC']['PetArenaDmg']}
Imaginarium     -  ${gBuilding['IM']['PetArenaDmg']}
Fresh Air       -  ${gBuilding['FA']['PetArenaDmg']}
Always Online   -  ${gBuilding['AO']['PetArenaDmg']}\`\`\``,
								},
								{
									name: 'Pet Training',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['PetTraning']}
Coming Soon     -  ${gBuilding['CS']['PetTraning']}
The Collectives -  ${gBuilding['TC']['PetTraning']}
Imaginarium     -  ${gBuilding['IM']['PetTraning']}
Fresh Air       -  ${gBuilding['FA']['PetTraning']}
Always Online   -  ${gBuilding['AO']['PetTraning']}\`\`\``,
								},
								{
									name: 'Beast Damage',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['BeastDmg']}
Coming Soon     -  ${gBuilding['CS']['BeastDmg']}
The Collectives -  ${gBuilding['TC']['BeastDmg']}
Imaginarium     -  ${gBuilding['IM']['BeastDmg']}
Fresh Air       -  ${gBuilding['FA']['BeastDmg']}
Always Online   -  ${gBuilding['AO']['BeastDmg']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['gold', 'bank'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Gold related bonus comparison**',
							fields: [
								{
									name: 'Bank Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Bank']}
Coming Soon     -  ${gBuilding['CS']['Bank']}
The Collectives -  ${gBuilding['TC']['Bank']}
Imaginarium     -  ${gBuilding['IM']['Bank']}
Fresh Air       -  ${gBuilding['FA']['Bank']}
Always Online   -  ${gBuilding['AO']['Bank']}\`\`\``,
								},
								{
									name: 'Gold Rate',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Gold']}
Coming Soon     -  ${gBuilding['CS']['Gold']}
The Collectives -  ${gBuilding['TC']['Gold']}
Imaginarium     -  ${gBuilding['IM']['Gold']}
Fresh Air       -  ${gBuilding['FA']['Gold']}
Always Online   -  ${gBuilding['AO']['Gold']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['level', 'lv', 'guild'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Guild Level comparison**',
							fields: [
								{
									name: 'Guild Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['GL']}
Coming Soon     -  ${gBuilding['CS']['GL']}
The Collectives -  ${gBuilding['TC']['GL']}
Imaginarium     -  ${gBuilding['IM']['GL']}
Fresh Air       -  ${gBuilding['FA']['GL']}
Always Online   -  ${gBuilding['AO']['GL']}\`\`\``,
								},
								{
									name: 'Wishing Well',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['WW']}
Coming Soon     -  ${gBuilding['CS']['WW']}
The Collectives -  ${gBuilding['TC']['WW']}
Imaginarium     -  ${gBuilding['IM']['WW']}
Fresh Air       -  ${gBuilding['FA']['WW']}
Always Online   -  ${gBuilding['AO']['WW']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['exp', 'experience', 'altar'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**XP related bonus comparison**',
							fields: [
								{
									name: 'Altar Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Altar']}
Coming Soon     -  ${gBuilding['CS']['Altar']}
The Collectives -  ${gBuilding['TC']['Altar']}
Imaginarium     -  ${gBuilding['IM']['Altar']}
Fresh Air       -  ${gBuilding['FA']['Altar']}
Always Online   -  ${gBuilding['AO']['Altar']}\`\`\``,
								},
								{
									name: 'XP Rate',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['EXP']}
Coming Soon     -  ${gBuilding['CS']['EXP']}
The Collectives -  ${gBuilding['TC']['EXP']}
Imaginarium     -  ${gBuilding['IM']['EXP']}
Fresh Air       -  ${gBuilding['FA']['EXP']}
Always Online   -  ${gBuilding['AO']['EXP']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['wood', 'sawmill', 'woodcutting'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Wood related bonus comparison**',
							fields: [
								{
									name: 'Sawmill Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Sawmill']}
Coming Soon     -  ${gBuilding['CS']['Sawmill']}
The Collectives -  ${gBuilding['TC']['Sawmill']}
Imaginarium     -  ${gBuilding['IM']['Sawmill']}
Fresh Air       -  ${gBuilding['FA']['Sawmill']}
Always Online   -  ${gBuilding['AO']['Sawmill']}\`\`\``,
								},
								{
									name: 'Woodcutting Damage',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['WoodDmg']}
Coming Soon     -  ${gBuilding['CS']['WoodDmg']}
The Collectives -  ${gBuilding['TC']['WoodDmg']}
Imaginarium     -  ${gBuilding['IM']['WoodDmg']}
Fresh Air       -  ${gBuilding['FA']['WoodDmg']}
Always Online   -  ${gBuilding['AO']['WoodDmg']}\`\`\``,
								},
								{
									name: 'Woodcutting Yield',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['WoodYield']}
Coming Soon     -  ${gBuilding['CS']['WoodYield']}
The Collectives -  ${gBuilding['TC']['WoodYield']}
Imaginarium     -  ${gBuilding['IM']['WoodYield']}
Fresh Air       -  ${gBuilding['FA']['WoodYield']}
Always Online   -  ${gBuilding['AO']['WoodYield']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['stone', 'warehouse', 'wh'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Stone related bonus comparison**',
							fields: [
								{
									name: 'Warehouse Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Warehouse']}
Coming Soon     -  ${gBuilding['CS']['Warehouse']}
The Collectives -  ${gBuilding['TC']['Warehouse']}
Imaginarium     -  ${gBuilding['IM']['Warehouse']}
Fresh Air       -  ${gBuilding['FA']['Warehouse']}
Always Online   -  ${gBuilding['AO']['Warehouse']}\`\`\``,
								},
								{
									name: '+1 Stone Drop Chance',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['StoneChance']}
Coming Soon     -  ${gBuilding['CS']['StoneChance']}
The Collectives -  ${gBuilding['TC']['StoneChance']}
Imaginarium     -  ${gBuilding['IM']['StoneChance']}
Fresh Air       -  ${gBuilding['FA']['StoneChance']}
Always Online   -  ${gBuilding['AO']['StoneChance']}\`\`\``,
								},
								{
									name: 'Stone Yield',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['StoneYield']}
Coming Soon     -  ${gBuilding['CS']['StoneYield']}
The Collectives -  ${gBuilding['TC']['StoneYield']}
Imaginarium     -  ${gBuilding['IM']['StoneYield']}
Fresh Air       -  ${gBuilding['FA']['StoneYield']}
Always Online   -  ${gBuilding['AO']['StoneYield']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['points', 'fortress', 'asc', 'ascension', 'point'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Points related bonus comparison**',
							fields: [
								{
									name: 'Fortress Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Fortress']}
Coming Soon     -  ${gBuilding['CS']['Fortress']}
The Collectives -  ${gBuilding['TC']['Fortress']}
Imaginarium     -  ${gBuilding['IM']['Fortress']}
Fresh Air       -  ${gBuilding['FA']['Fortress']}
Always Online   -  ${gBuilding['AO']['Fortress']}\`\`\``,
								},
								{
									name: 'Asc Points',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['AscPoints']}
Coming Soon     -  ${gBuilding['CS']['AscPoints']}
The Collectives -  ${gBuilding['TC']['AscPoints']}
Imaginarium     -  ${gBuilding['IM']['AscPoints']}
Fresh Air       -  ${gBuilding['FA']['AscPoints']}
Always Online   -  ${gBuilding['AO']['AscPoints']}\`\`\``,
								},
								{
									name: 'Legendary Points',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['LegPoints']}
Coming Soon     -  ${gBuilding['CS']['LegPoints']}
The Collectives -  ${gBuilding['TC']['LegPoints']}
Imaginarium     -  ${gBuilding['IM']['LegPoints']}
Fresh Air       -  ${gBuilding['FA']['LegPoints']}
Always Online   -  ${gBuilding['AO']['LegPoints']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['tower', 'sacrifical', 'offerings', 'offering', 'so'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Sacrifical Offering related bonus comparison**',
							fields: [
								{
									name: 'Sacrifical Tower Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['SacTower']}
Coming Soon     -  ${gBuilding['CS']['SacTower']}
The Collectives -  ${gBuilding['TC']['SacTower']}
Imaginarium     -  ${gBuilding['IM']['SacTower']}
Fresh Air       -  ${gBuilding['FA']['SacTower']}
Always Online   -  ${gBuilding['AO']['SacTower']}\`\`\``,
								},
								{
									name: 'Sacrifical Offering XP',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['SacEXP']}
Coming Soon     -  ${gBuilding['CS']['SacEXP']}
The Collectives -  ${gBuilding['TC']['SacEXP']}
Imaginarium     -  ${gBuilding['IM']['SacEXP']}
Fresh Air       -  ${gBuilding['FA']['SacEXP']}
Always Online   -  ${gBuilding['AO']['SacEXP']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['fish', 'aquctic', 'aqua'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Fish related bonus comparison**',
							fields: [
								{
									name: 'Aquatic Research Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Aqua']}
Coming Soon     -  ${gBuilding['CS']['Aqua']}
The Collectives -  ${gBuilding['TC']['Aqua']}
Imaginarium     -  ${gBuilding['IM']['Aqua']}
Fresh Air       -  ${gBuilding['FA']['Aqua']}
Always Online   -  ${gBuilding['AO']['Aqua']}\`\`\``,
								},
								{
									name: 'Fish Value',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['FishValue']}
Coming Soon     -  ${gBuilding['CS']['FishValue']}
The Collectives -  ${gBuilding['TC']['FishValue']}
Imaginarium     -  ${gBuilding['IM']['FishValue']}
Fresh Air       -  ${gBuilding['FA']['FishValue']}
Always Online   -  ${gBuilding['AO']['FishValue']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['cards', 'card', 'library'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Cards related bonus comparison**',
							fields: [
								{
									name: 'Library Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Library']}
Coming Soon     -  ${gBuilding['CS']['Library']}
The Collectives -  ${gBuilding['TC']['Library']}
Imaginarium     -  ${gBuilding['IM']['Library']}
Fresh Air       -  ${gBuilding['FA']['Library']}
Always Online   -  ${gBuilding['AO']['Library']}\`\`\``,
								},
								{
									name: 'Card Drop Amount',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['CardDrop']}
Coming Soon     -  ${gBuilding['CS']['CardDrop']}
The Collectives -  ${gBuilding['TC']['CardDrop']}
Imaginarium     -  ${gBuilding['IM']['CardDrop']}
Fresh Air       -  ${gBuilding['FA']['CardDrop']}
Always Online   -  ${gBuilding['AO']['CardDrop']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['challenge'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Challenge related bonus comparison**',
							fields: [
								{
									name: 'Challenge Damage',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['ChallengeDmg']}
Coming Soon     -  ${gBuilding['CS']['ChallengeDmg']}
The Collectives -  ${gBuilding['TC']['ChallengeDmg']}
Imaginarium     -  ${gBuilding['IM']['ChallengeDmg']}
Fresh Air       -  ${gBuilding['FA']['ChallengeDmg']}
Always Online   -  ${gBuilding['AO']['ChallengeDmg']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (['space', 'academy', 'ship', 'sa'].indexOf(content[0]) >= 0) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Space Arena related bonus comparison**',
							fields: [
								{
									name: 'Space Academy Level',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['Academy']}
Coming Soon     -  ${gBuilding['CS']['Academy']}
The Collectives -  ${gBuilding['TC']['Academy']}
Imaginarium     -  ${gBuilding['IM']['Academy']}
Fresh Air       -  ${gBuilding['FA']['Academy']}
Always Online   -  ${gBuilding['AO']['Academy']}\`\`\``,
								},
								{
									name: 'Ship Arena HP/Damage',
									value: `\`\`\`prolog
Burning Rage    -  ${gBuilding['BR']['ShipArenaDmg']}
Coming Soon     -  ${gBuilding['CS']['ShipArenaDmg']}
The Collectives -  ${gBuilding['TC']['ShipArenaDmg']}
Imaginarium     -  ${gBuilding['IM']['ShipArenaDmg']}
Fresh Air       -  ${gBuilding['FA']['ShipArenaDmg']}
Always Online   -  ${gBuilding['AO']['ShipArenaDmg']}\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (content[0] === 'highest') {
				const petHigh = gBuilding['others']['petArenaHighest'].split(',');
				const ascHigh = gBuilding['others']['ascPointsHighest'].split(',');
				const shipHigh = gBuilding['others']['shipArenaHighest'].split(',');
				const woodHigh = gBuilding['others']['woodCuttingHighest'].split(',');
				const stoneHigh = gBuilding['others']['stoneHighest'].split(',');
				const soHigh = gBuilding['others']['SacEXPHighest'].split(',');
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Highest Bonus**',
							fields: [
								{
									name: 'Shows guild that has highest guild bonus',
									value: `\`\`\`prolog
Sawmill    - ${woodHigh[1] + ', ' + woodHigh[0]} Lv
Warehouse  - ${stoneHigh[1] + ', ' + stoneHigh[0]} Lv
Sac Tower  - ${soHigh[1] + ', ' + soHigh[0]} Lv
Academy    - ${shipHigh[1] + ', ' + shipHigh[0]} Lv
Asc Points - ${ascHigh[1] + ', ' + ascHigh[0]} Pts
Stable     - ${petHigh[1] + ', ' + petHigh[0]} Lv\`\`\``,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: `Last updated on ${Global.monthEng[gBuilding['timeinfo']['months']]} ${
									gBuilding['timeinfo']['days']
								} ${gBuilding['timeinfo']['years']}, ${gBuilding['timeinfo']['hour']}:${
									gBuilding['timeinfo']['mins']
								} JST(GMT+9)`,
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else if (content[0] === 'help' || !content[0]) {
				message.channel
					.send({
						embed: {
							color: `${color}`,
							author: {
								name: 'Cows \'n\' Chaos',
							},
							title: '**Compare**',
							fields: [
								{
									name: 'Available Contents (use ~ before the desired command)\n',
									value: `\n\r
***Level*** - Guild Level, Wishing Well
***Pet*** - Stable Level, PetDmg, Pet Arena Dmg, Pet Training, Beast Damage
***Gold*** - Bank Level, Gold Rate
***Exp*** - Altar Level, EXP Rate
***Wood*** - Sawmill Level, Woodcutting Dmg, Woodcutting Yield
***Stone*** - Warehouse Level, +1 Stone Chance, Stone Yield
***Points*** - Fortress Level, Asc Points, Legendary Points
***Tower*** - Sacrifical Tower Level, Sacrifical Offering EXP
***Fish*** - Aquatic Research Level, Fish Value
***Cards*** - Library Level, Card Drop Amount
***Challenge*** - Challenge Damage
***Space*** - Space Academy Level, Space Arena HP/Damage

***ex) ~compare stone***
\n\r
`,
								},
							],

							footer: {
								icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
								text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',
							},
						},
					})
					.catch(function(err) {
						console.error(err);
					});
			}
			else {
				message.channel.send('You must type correct content name you want to compare (See ~compare help)');
			}
			return;
		});
};
