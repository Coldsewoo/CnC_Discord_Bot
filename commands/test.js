const fs = require('fs');
const path = require('path');
const https = require('https');
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;
const guildinfo = globalVar.Guildinfo;

const {
	get
} = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client()


exports.run = (client, message, args) => {


	function requireUncached(module) {
		delete require.cache[require.resolve(module)];
		return require(module);
	}

};