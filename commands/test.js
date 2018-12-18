const fs = require('fs');
const path = require('path');
const https = require('https');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;


exports.run = (client, message, args) => {
	var guildsheet = requireUncached('../json/guildsheet.json');


	function requireUncached(module){
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};
