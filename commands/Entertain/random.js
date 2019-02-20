const fetch = require("node-fetch")
const Discord = require('discord.js');
const client = new Discord.Client();
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;
const config = require(__basedir + '/config.json');

exports.run = (client, message, args) => {
	if (Global.cnc_spam.indexOf(message.channel.id) == -1) {
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
	const queryItem = args;
	const pingSock = "<:PingSock:508407641295552518>"
	const hello = "<:hello:466677170081628195>"
	if (queryItem.slice().shift()) {
		const argSliced = queryItem.slice().shift().toLowerCase()
		if (argSliced == "coldsewoo" || argSliced == "cold") {
			return message.reply("❤");
		} else if (argSliced == "discord") {
			return message.reply(pingSock);
		} else if (argSliced == "stella") {
			return message.reply("😈");
		} else if (argSliced == "lili") {
			return message.reply(hello);
		}
	}
	try {
		const url = `https://api.imgur.com/3/gallery/search/top/1/?q=${queryItem}`
		const IMGUR_API_CLIENT = config.IMGUR_API

		fetch(url, { headers: { Authorization: `Client-ID ${IMGUR_API_CLIENT}` } })
			.then(res => res.json())
			.then(json => {
				var length = json.data.length;
				var selected = false;
				var data;
				while (selected == false) {
					let random = Math.floor(Math.random() * length)
					data = json.data[random];
					let type = data.type;
					let nsfw = data.nsfw
					if (!type || type.endsWith('gif') || !nsfw || nsfw == true) {
						selected = false;
					} else {
						selected = true;
					}
				}
				const embed = new Discord.RichEmbed()
					.setAuthor(`Image search for : ${queryItem}`, 'https://i.imgur.com/zP6pntT.png')
					.setTitle(data.link)
					.setURL(data.link)
					.setImage(data.link)
					.setColor(0xf7fe00)
					.setFooter(data.title)
				return message.channel.send({
					embed
				});
			})
	} catch (err) {
		console.log(err);
	}
};