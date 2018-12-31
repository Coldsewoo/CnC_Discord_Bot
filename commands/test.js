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
	message.guild.channels.forEach((channel) => {
		message.channel.send("name : " + channel.name + " , " + "id : " + channel.id);
	});

	// message.guild.channels((channel) => {
	// 	forEach((channel) => {
	// 		console.log(channel)
	// 	})
	// })









	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};