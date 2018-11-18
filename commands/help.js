exports.run = (client, message, args) => {
	const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	const guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
	let color;
	for (let i = 0; i < 6; i++) {
		if(message.member.roles.find(role => role.name === guildname[i])) {color = guildcolor[i];}
	}
	if (!color) color = guildcolor[6];

	message.reply({ embed: {
		color: color,
		author: {
			name: 'Cows \'n\' Chaos',

		},
		title: '**Help**',
		fields: [
			{
				name: 'Available Commands',
				value: `
__*For Everyone*__
***Personal*** : **Calculate stone required for guild personal from and to**
 *See ~Personal help*
***Guildstone*** : **Calculate stone required for guild level from and to**
 *See ~Guildstone help*
***Guides*** : **Useful Sheets & Guides on IOU**
***Cat*** : **Random cat XD**
***Puppy*** : **Random puppy XDXD**

__*For CnC members*__
***Info*** : **Guild Level information**
 *See ~info help*
***Bonus*** : **Guild Bonus information**
 *See ~Bonus help*
***Compare*** : **Compare level & bonus information on each guild**
 *See ~Compare help*
***Queue*** : **Shows queue list, In and Out**
 *See ~Queue help*
***Update*** : **Update guild information**
*Updated Information is from CnC Guild's Utility Sheet*

__*For ADMINS*__
***ClearCommands*** - **Delete messages related to bot request in this channel**

**Contact me if you have any question or suggestion!**
**https://github.com/Coldsewoo/CnC_Discord_Bot**\n\n\n
          `,
			},
		],

		footer: {
			icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
			text: 'IOU_BOT made by Coldsewoo (차가운새우#2410)',

		},
	},
	}).catch(function(err) {
		console.error(err);
	});
};
