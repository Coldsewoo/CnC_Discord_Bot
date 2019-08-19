const { get } = require('snekfetch');
const Discord = require('discord.js');
const globalVar = require(__basedir + '/globalVar.js');
const Global = globalVar.Global;

exports.run = (client, message, args) => {
	if (Global.cnc_spam.indexOf(message.channel.id) > -1) {
		if (Global.testChannels.indexOf(message.channel.id) == -1) {
			message.delete();
			message.reply('Please use in spam channel :)');
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
	try {
		get('https://dog.ceo/api/breeds/image/random').then(res => {
			const image = JSON.parse(res.text);
			const embed = new Discord.RichEmbed().setImage(image.message);
			return message.channel.send({
				embed,
			});
		});
	}
	catch (err) {
		return message.channel.send(err.stack);
	}
};
