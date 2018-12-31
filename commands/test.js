const fs = require('fs');
const path = require('path');
const https = require('https');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;
const {
	get
} = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client()

exports.run = (client, message, args) => {
	// message.guild.channels.forEach((channel) => {
	// 	message.channel.send("name : " + channel.name + " , " + "id : " + channel.id);
	// });

	if (Global.cnc_spam.indexOf(message.channel.id) == -1) {
		if (Global.testChannels.indexOf(message.channel.id) == -1) {
			return message.reply("Wrong channel!")
		}
	}

	message.channel.send("test");




	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};