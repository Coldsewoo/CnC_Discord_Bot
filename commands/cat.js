const {
	get
} = require('snekfetch');
const Discord = require('discord.js');
const global = require('../global.js')
const Global = global.Global;

exports.run = (client, message, args) => {
	if (Global.cnc_spam.indexOf(message.channel.id) > -1) {
		if (Global.testChannels.indexOf(message.channel.id) == -1) {
			message.delete();
			message.reply("Please use in spam channel :)")
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
	try {
		get('https://aws.random.cat/meow').then(res => {
			const embed = new Discord.RichEmbed()
				.setImage(res.body.file);
			return message.channel.send({
				embed
			});
		});
	} catch (err) {
		return message.channel.send(err.stack);
	}
};