const fs = require('fs');
const path = require('path');
const https = require('https');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;
const { get } = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client()

exports.run = (client, message, args) => {
	var guildsheet = requireUncached('../json/guildsheet.json');

	try {
		get('http://oversea.i815.or.kr/country/?mode=V&p=1&l_cd=china&m_no=CN00'+'200').then(res => {
			if(!res) return;
			console.log(res.text);
		});
	}
	catch(err) {
		console.log(err);
	}
















	function requireUncached(module){
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};
