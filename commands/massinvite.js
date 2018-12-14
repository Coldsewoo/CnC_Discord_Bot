const fs = require('fs');
const path = require('path');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;

exports.run = (client, message, args) => {
		var guildsheet = requireUncached('../json/guildsheet.json');

		if (!message.member.roles.find(role => role.name === 'Bot_controler') && !message.member.roles.find(role => role.name === 'Bot Controller')) return;

		message.delete();
		message.channel.fetchPinnedMessages()
			.then(collected => {
				collected.forEach(msg => {
					if (msg.author.bot) msg.delete();
				});
			}).catch(console.error);
			var guildName;
			const brChannel = "<#491666791345684481>"; //0
			const aoChannel = "<#511304632115527680>"; //5
			const csChannel = "<#518820495878258710>"; //1

			const textChannelforBR = "<#419088680670461972>"; //test
			const coldsewoobotChannelforAO = "<#508458634678763535>"; //test
			const musicbotChannelforCS = "<#508626305365835787>"; //test
			if (message.channel == brChannel || message.channel == textChannelforBR) {
				guildName = 0
			} else
			if (message.channel == aoChannel || message.channel == coldsewoobotChannelforAO) {
				guildName = 5
			} else
			if (message.channel == csChannel || message.channel == musicbotChannelforCS) {
				guildName = 1
			} else guildName = 5;

		if (!guildsheet[8][2] || (guildsheet[8][1] == 11 && guildsheet[8][2] == 19)) return message.channel.send(' *Please* **~update** *first*');

	var massinviteDate = new Date();
	var massinviteTime = new Date(massinviteDate.getTime() + (massinviteDate.getTimezoneOffset() * 60000) + 32400000);
	var massinviteTimeJp = massinviteTime.toLocaleString('ja-JP');
	let massinviteTimeSplit = massinviteTimeJp.split(",");
	let splitedDays = massinviteTimeSplit[0].split("/");
	let splitedTime = massinviteTimeSplit[1].split(":");
	let mon = Global.monthEng[splitedDays[0]];
	let days = splitedDays[1];
	let hours = splitedTime[0].split(/ +/g)[1];
	let minutes = splitedTime[1];
	let amPm = splitedTime[2].split(/ +/g)[1];
	const result = days % 10;
	if (result === 1) {
		days += 'th';
	}
	else
	if (result === 2) {
		days += 'nd';
	}
	else
	if (result === 3) {
		days += 'rd';
	}
	else {
		days += 'th';
	}

		async function massinvites() {
			await message.channel.send( { embed: {
				color: 16398164,
				author: {
					name: 'Cows \'n\' Chaos',

				},
				title: `**  ${guildinfo[0][guildName][0]['guild_name']} Guild**`,
				fields:
          [
          	{
          		name: '**  Mass Invite Updater**',
          		value: ` Mass Invites sent on ***${mon} ${days}, ${hours}:${minutes}${amPm} JST (GMT +9)***. If you need to be Added to the List, TAG or send DM to **@Coldsewoo** or link your Multicalc in **CnC Utility Sheet**. (https://docs.google.com/spreadsheets/d/1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo/edit#gid=1546377489)`,
          	},
          	{
          		name: '**         Building                      Level**',
          		value: `\`\`\`css
 Guild Level  - ${guildsheet[guildName][2]}    \n Wishing Well - ${guildsheet[guildName][3]}
 Stable       - ${guildsheet[guildName][4]}    \n Fortress     - ${guildsheet[guildName][5]}
 Bank         - ${guildsheet[guildName][6]}    \n Sawmill      - ${guildsheet[guildName][7]}
 Sac Tower    - ${guildsheet[guildName][8]}    \n Warehouse    - ${guildsheet[guildName][9]}
 Altar        - ${guildsheet[guildName][10]}    \n Library      - ${guildsheet[guildName][11]}
 Aquatic      - ${guildsheet[guildName][12]}    \n Space Aca.   - ${guildsheet[guildName][13]}     \`\`\`\`\`\`prolog\n Total Stone - ${guildsheet[guildName][35]}\`\`\``,
          	},
          ],
				footer: {
					icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: `Last updated on ${Global.monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`,
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

			function requireUncached(module) {
				delete require.cache[require.resolve(module)];
				return require(module);
			}
};
