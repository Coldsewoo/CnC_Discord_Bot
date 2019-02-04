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
	const channelId = "508458634678763535";
	const codeChannel = client.channels.get(channelId)
	codeChannel.fetchMessages({
		limit: 1
	}).then(collected => {
		collected.forEach(msg => {
			console.log(msg.content);
		})
	})





	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};