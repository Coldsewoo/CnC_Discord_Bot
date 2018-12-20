const fs = require('fs');
const path = require('path');
const https = require('https');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;


exports.run = (client, message, args) => {
	var guildsheet = requireUncached('../json/guildsheet.json');
	message.channel.send(message.author.id);
	if(message.author.id != Global.adminId) message.channel.send("boo");

	function requireUncached(module){
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};
