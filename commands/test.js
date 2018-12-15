const fs = require('fs');
const path = require('path');
const https = require('https');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;


exports.run = (client, message, args) => {
	var guildsheet = requireUncached('../json/guildsheet.json');
	message.channel.send("<:GWmythicalGhostHug:367722252567052298>");
	const emojiList2 = message.guild.emojis.map(e=>e.toString()).join(" ");
	message.channel.send(emojiList2);

	const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
	console.log(emojiList);

	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}
};
