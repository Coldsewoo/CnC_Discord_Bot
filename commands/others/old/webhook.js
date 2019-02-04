const {
	get
} = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client();
const global = require('../../global.js')
const Global = global.Global;

exports.run = (client, message, args) => {

	var facebookArray = new Array();
	var channelArray = new Array();
	try {
		get('https://www.facebook.com/pg/Idle-Online-Universe-IOU-RPG-320106674851481/posts/?ref=page_internal').then(res => {
			var content = res.body.toString();
			var codeFinder = "Here are your codes"
			var codeEndFinder = "Cheers, Lynn"
			var codeIndex = content.indexOf(codeFinder);
			var codeEndIndex = content.indexOf(codeEndFinder);
			var codes = content.substring(codeIndex, codeEndIndex)
			var br = "<br />"
			var codesArray = codes.split(br);
			for (let i = 0; i < 3; i++) {
				codesArray[i] = codesArray[i].trim();
				facebookArray.push(codesArray[i]);
			}
			return facebookArray;
		}).then(facebookArray => {
			var msgArray = new Array();
			const channelId = "508458634678763535";
			const codeChannel = client.channels.get(channelId)

			codeChannel.fetchMessages({
				limit: 1
			}).then(collected => {
				collected.forEach(msg => {
					msgArray = msg.content.split(/\n/);
				})
				return Promise.resolve([facebookArray, msgArray])
			}).then(([facebookArray, msgArray]) => {
				if (!facebookArray.includes(msgArray[1])) {
					message.channel.send(facebookArray);
				}
			})
		})
	} catch (err) {
		console.log(err);
	}



};