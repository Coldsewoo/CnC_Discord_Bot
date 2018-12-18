const { get } = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client()

exports.run = (client, message, args) => {
	const queryItem = args;
	const heart = null;
	const pingSock = "<:PingSock:508407641295552518>"
	if(queryItem.slice().shift()) {
		var argSliced = queryItem.slice().shift().toLowerCase()
		if (argSliced == "coldsewoo" || argSliced == "cold"){
			return message.reply("❤");
		} else if (argSliced == "discord") {
			return message.reply(pingSock);
		} else if (argSliced == "stella") {
			return message.reply("😈");
		}

	}
	try {
		let path;
		get('https://loremflickr.com/448/336/' + queryItem).then(res => {
			if(!res) return;
			if(res.request.path == '/cache/resized/defaultImage.small_448_336_nofilter.jpg') {
				path = 'https://i.postimg.cc/RZN8F0VP/chromie2.jpg';
			}
			else {
				path = 'https://loremflickr.com' + res.request.path;
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
