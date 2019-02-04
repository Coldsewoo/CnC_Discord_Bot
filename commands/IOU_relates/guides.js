const db = require(__basedir + '/coldsewooBOT.js');
const buildings = db.collection('buildings');
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;

exports.run = (client, message, args) => {
	var gBuilding = {};
	buildings.get().then(async docs => {
		await docs.forEach(doc => {
			gBuilding[doc.id] = doc.data();
		})
		const messageTime = new Date().getTime() / 1000;
		const storedTime = gBuilding["timeinfo"]["timestamp"]
		const timeDiff = Math.abs(messageTime - storedTime)
		return Promise.resolve(timeDiff);
	}).then((timeDiff) => {
		if (timeDiff > 3600 * 24 * 1000) return message.reply("Please ~update")


		message.reply({
			embed: {
				color: 1397735,
				author: {
					name: 'Idle Online Universe',

				},
				title: '**Useful Sheets & Guides**',
				fields: [
					{
						name: 'IOU Complete Multicalc',
						value: `
				[Link to URL](https://docs.google.com/spreadsheets/d/1QGBm6KtcOZraqSkLWVuqTF16vUD7rrOvIpdh59bFLmg/edit) -  ${gBuilding['others']['LatestMC']}
				`,
					},
					{
						name: 'CnC Guild\'s Utility Sheet',
						value: `
				[Link to URL](https://docs.google.com/spreadsheets/d/1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo/edit#gid=1654182966)
				`,
					},
					{
						name: 'CnC Looking for Party Sheet',
						value: `
				[Link to URL](https://docs.google.com/spreadsheets/d/1GB3bMxn1KzJIvfNjMfBTOb3ouK49OGAFV00eVho2xXs/edit?usp=sharing)
				`,
					},
					{
						name: 'IOU Starter Guide',
						value: `
				[Link to URL](https://tinyurl.com/IOUguide)
				`,
					},
					{
						name: 'BRIEF GUIDE for WOOD BUILD, STONE and SHIP PUSHES',
						value: `
				[Link to URL](https://docs.google.com/document/d/1zQkz1wq7RsJEKE_8CFQ4-tJW0sUdAs-uekbXIC6H6A0/edit?usp=sharing)
				`,
					},
					{
						name: 'IOU Wiki',
						value: `
				[Link to URL](http://iourpg.wikia.com/wiki/Idle_Online_Universe_Wiki)
				`,
					},
					{
						name: 'Stone Push Guide (Always Online)',
						value: `
				Made by Joep [Link to URL](https://docs.google.com/document/d/1ix_YdR3fnw1eNIvLHrR4RaO-4OvjGAQ5dd2UN2zopfM/edit)
				`,
					},
				],

				footer: {
					icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: 'IOU_BOT made by Coldsewoo (차가운새우#2410)',

				},
			},
		}).catch(function (err) {
			console.error(err);
		});










	})

}
