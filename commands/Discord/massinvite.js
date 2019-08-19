const db = require(__basedir + '/coldsewooBOT.js');
const buildings = db.collection('buildings');
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;

exports.run = (client, message, args) => {
	const gBuilding = {};
	buildings.get().then(async docs => {
		await docs.forEach(doc => {
			gBuilding[doc.id] = doc.data();
		});
		const messageTime = new Date().getTime() / 1000;
		const storedTime = gBuilding['timeinfo']['timestamp'];
		const timeDiff = Math.abs(messageTime - storedTime);
		return Promise.resolve(timeDiff);
	}).then((timeDiff) => {
		if (timeDiff > 3600 * 24) return message.reply('Please ~update');

		if (!message.member.roles.find(role => role.name === 'Bot_controler') && !message.member.roles.find(role => role.name === 'Bot Controller')) return;

		message.delete();
		message.channel.fetchPinnedMessages()
			.then(collected => {
				collected.forEach(msg => {
					if (msg.author.bot) msg.delete();
				});
			}).catch(console.error);
		const brChannel = '<#491666791345684481>'; // 0
		const aoChannel = '<#585380244148715520>'; // 5
		const csChannel = '<#518820495878258710>'; // 1
		const tcChannel = '<#597052817093689344>'; // tc

		const textChannelforBR = '<#419088680670461972>'; // test
		const coldsewoobotChannelforAO = '<#508458634678763535>'; // test
		const musicbotChannelforCS = '<#508626305365835787>'; // test

		let guildname;
		if (message.channel == brChannel || message.channel == textChannelforBR) {
			guildname = 'BR';
		}
		else
		if (message.channel == aoChannel || message.channel == coldsewoobotChannelforAO) {
			guildname = 'AO';
		}
		else
		if (message.channel == csChannel || message.channel == musicbotChannelforCS) {
			guildname = 'CS';
		}
		else
		if (message.channel == tcChannel) {
			guildname = 'TC';
		}
		else {
			guildname = 'TC';
		}

		const massinviteDate = new Date();
		const massinviteTime = new Date(massinviteDate.getTime() + (massinviteDate.getTimezoneOffset() * 60000) + 32400000);
		const massinviteTimeJp = massinviteTime.toLocaleString('ja-JP');
		const massinviteTimeSplit = massinviteTimeJp.split(' ');
		const splitedDays = massinviteTimeSplit[0].split('-');
		const splitedTime = massinviteTimeSplit[1].split(':');
		const mon = Global.monthEng[splitedDays[1]];
		let days = splitedDays[2];
		const hours = splitedTime[0];
		const minutes = splitedTime[1];
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
			await message.channel.send({
				embed: {
					color: 16398164,
					author: {
						name: 'Cows \'n\' Chaos',

					},
					title: `**  ${gBuilding[guildname]['guildName']} Guild**`,
					fields:
                        [
                            {
                                name: '**  Mass Invite Updater**',
                                value: ` Mass Invites sent on ***${mon} ${days}, ${hours}:${minutes} JST (GMT +9)***. If you need to be Added to the List, TAG or send DM to **@Coldsewoo** or link your Multicalc in **CnC Utility Sheet**. (https://docs.google.com/spreadsheets/d/1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo/edit#gid=1546377489)`,
                            },
                            {
                                name: '**             Building                         Level**       ',
                                value: `\`\`\`css
 Guild Level  -    ${gBuilding[guildname]["GL"]} \n Wishing Well -    ${gBuilding[guildname]["WW"]}
 Stable       -    ${gBuilding[guildname]["Stable"]} \n Fortress     -    ${gBuilding[guildname]["Fortress"]}
 Bank         -    ${gBuilding[guildname]["Bank"]} \n Sawmill      -    ${gBuilding[guildname]["Sawmill"]}
 Sac Tower    -    ${gBuilding[guildname]["SacTower"]} \n Warehouse    -    ${gBuilding[guildname]["Warehouse"]}
 Altar        -    ${gBuilding[guildname]["Altar"]} \n Library      -    ${gBuilding[guildname]["Library"]}
 Aquatic      -    ${gBuilding[guildname]["Aqua"]} \n Space Aca.   -    ${gBuilding[guildname]["Academy"]} \`\`\`\`\`\`prolog\n   TotalStone - ${gBuilding[guildname]["ShortGuildStone"]} \`\`\``,
                            },],

                    footer: {
                        icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
                        text: `Last updated on ${Global.monthEng[gBuilding["timeinfo"]["months"]]} ${gBuilding["timeinfo"]["days"]} ${gBuilding["timeinfo"]["years"]}, ${gBuilding["timeinfo"]["hour"]}:${gBuilding["timeinfo"]["mins"]} JST(GMT+9)`,

                    },
                }
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









    })

}