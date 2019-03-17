// eslint-disable-next-line no-undef
const globalVar = require(__basedir + '/globalVar.js');
const Global = globalVar.Global;

exports.run = (client, message, args) => {
	// const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	// const guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
	let color;
	for (let i = 0; i < 6; i++) {
		if (message.member.roles.find(role => role.name === Global.guildRole[i])) {
			color = Global.guildColor[i];
		}
	}
	if (!color) color = Global.guildColor[6];

	message.channel.send({
		embed: {
			color: color,
			author: {
				name: 'Cows \'n\' Chaos',

			},
			title: '**Help**',
			fields: [{
				name: 'Available Commands (use ~ before the desired command)',
				value: `
__*For Everyone*__
***p*** : **Calculates exp required for personal lv**
***pl*** : **Calculates the personal level you can reach with given personal EXP**
***g*** : **Calculates stone required for guild lv**
***gl*** : **Calculates the guild building level you can reach with given stone amount**
***Guides*** : **Useful Sheets & Guides on IOU**
***Random*** : **Random pictures!**

__*For CnC members*__
***Update*** : **Update guild information**
*the Information is from CnC Guild's Utility Sheet*
***Info*** : **Guild Level information**
***Bonus*** : **Guild Bonus information**
***Compare*** : **Compare level & bonus information each guild**
***Queue*** : **Shows queue list, In and Out**
*(__Only for INNER-GUILD PUSHES channels!__)*

__*For ADMINS*__
***clear [Number]*** - **Delete messages in this channel**
***clearcmds [Number]*** - **Delete bot related request in this channel**

**Contact me if you have any question or suggestion!**
**https://github.com/Coldsewoo/CnC_Discord_Bot**\n\n\n
          `,
			}],

			footer: {
				icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
				text: 'IOU_BOT made by Coldsewoo (차가운새우#2410)',

			},
		},
	}).catch(function(err) {
		console.error(err);
	});
};