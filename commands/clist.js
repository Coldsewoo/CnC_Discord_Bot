const fs = require('fs');
const path = require('path');
const global = require('../global.js')
const Global = global.Global;

exports.run = (client, message, args) => {
	if(!message.author.id == Global.adminId) return;
	let commandNames = [];
	fs.readdir(path.join(__dirname, '..', 'commands'), (err, files) => {
	  if (err) return console.error(err)
	  files.forEach(file => {
	    if (!file.endsWith('.js')) return
	    let props = require(path.join(__dirname, '..', 'commands', `${file}`))
	    let commandName = file.split('.')[0]
			commandNames.push(commandName);
	  })
		message.channel.send(commandNames);
		message.channel.fetchMessages({ limit: 1 })
			.then(collected => {
				collected.forEach(msg => {
					if (msg.author.bot) msg.pin();
				});
			}).catch(console.error);
	})
};
