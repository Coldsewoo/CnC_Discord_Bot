const fs = require('fs');
const path = require('path');
const globalVar = require(__basedir + '/globalVar.js');
const Global = globalVar.Global;
const Path = __basedir + '/' + 'commands';
const commandNames = [];

exports.run = (client, message, args) => {
	if (message.author.id != Global.adminId) return;

	readCmds().then(commandNames => {
		commandNames.sort();
		message.channel.send(commandNames);
	});

	function readCmds() {
		return new Promise((resolve, reject) => {
			fs.readdir(Path, (err, files) => {
				if (err) return console.error(err);
				files.forEach(file => {
					if (!fs.statSync(Path + '/' + file).isDirectory()) {
						if (!file.endsWith('.js')) {
							return;
						}
						else {
							const commandName = file.split('.')[0];
							commandNames.push(commandName);
						}
					}
					else if (file == 'others') {
						return;
					}
					else {
						fs.readdir(Path + '/' + file, (err, innerFiles) => {
							if (err) return console.error(err);
							innerFiles.forEach(innerFile => {
								if (!innerFile.endsWith('.js')) return;
								const commandName = innerFile.split('.')[0];
								commandNames.push(commandName);
							});
						});
					}
				});
			});
			setTimeout(() => {
				resolve(commandNames);
			}, 2500);
		});
	}
};
