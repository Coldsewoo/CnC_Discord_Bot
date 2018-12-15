const { get } = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client()

exports.run = (client, message, args) => {
	const requestItem = args;
	let findMe;
	if (requestItem) findMe = requestItem.slice().toLowerCase();
	if (findMe == 'coldsewoo' || findMe == 'cold') return message.reply(":heart:");
	try {
		let path;
		get('https://loremflickr.com/448/336/' + requestItem).then(res => {
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
