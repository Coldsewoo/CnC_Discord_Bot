const { get } = require('snekfetch');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
	try {
		get('https://aws.random.cat/meow').then(res => {
			const embed = new Discord.RichEmbed()
				.setImage(res.body.file);
			return message.channel.send({ embed });
		});
	}
	catch(err) {
		return message.channel.send(err.stack);
	}
};
