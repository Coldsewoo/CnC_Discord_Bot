const { get } = require('snekfetch');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
	try {
		const requestItem = args.shift().toLowerCase();
		if(requestItem == "coldsewoo") return message.reply(":heart:");
		var path;
		get('https://loremflickr.com/448/336/'+args).then(res => {
			if(!res) return;
			if(res.request.path == "/cache/resized/defaultImage.small_448_336_nofilter.jpg"){
				path = 'https://i.postimg.cc/RZN8F0VP/chromie2.jpg';
			} else {
				path = 'https://loremflickr.com'+res.request.path;
			}
		const embed = new Discord.RichEmbed()
				.setImage(path);
			return message.channel.send({ embed });
		});
	}
	catch(err) {
		console.log(err);
	}
};
