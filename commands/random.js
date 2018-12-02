const { get } = require('snekfetch');

exports.run = (client, message, args) => {
	try {
		const requestItem = args;
		get('https://loremflickr.com/320/240/'+requestItem).then(res => {
		const embed = new Discord.RichEmbed()
				.setImage('https://loremflickr.com'+res.request.path);
			return message.channel.send({ embed });
		});
	}
	catch(err) {
		return message.channel.send(err.stack);
	}
};
