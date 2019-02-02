const path = require('path')
const fs = require('fs')

exports.run = (client, message, args) => {
	if (message.member.roles.find(role => role.name === 'Bot Controller')) {
		if (!args || args.size < 1) return message.reply('Must provide a command name to realod.');
		const commandName = args[0];
		// Check if the commands exists and is invalid
		if (!client.commands.has(commandName)) {
			return message.reply('That command does not exiest');
		}

		findPath(commandName)
			.then((innerPath) => {
				delete require.cache[require.resolve(`${innerPath}/${commandName}.js`)];
				// We also need to delete and reload the command from the client.commands enmap
				client.commands.delete(commandName);
				const props = require(`${innerPath}/${commandName}.js`);
				client.commands.set(commandName, props);
				message.reply(`The command ${commandName} has been reloaded`);
			})
	}
	else {
		message.reply('You do not have a permission to run this command.');
	}


	function findPath(cmdName) {
		return new Promise((resolve, reject) => {
			var cmd = cmdName;
			var cmdPath = path.resolve(__basedir, "commands");
			var innerPath;
			fs.readdir(cmdPath, (err, files) => {
				if (err) console.log(err);
				files.forEach(file => {
					if (!fs.statSync(`${cmdPath}/${file}`).isDirectory()) {
						if (file.startsWith(cmd)) {
							innerPath = `${cmdPath}`
							resolve(innerPath);
						}
					} else {
						fs.readdir(`${cmdPath}/${file}`, (err, innerFiles) => {
							if (err) console.log(err);
							innerFiles.forEach(innerFile => {
								if (innerFile.startsWith(cmd)) {
									innerPath = `${cmdPath}/${file}`;
									resolve(innerPath);
								}
							})
						})
					}
				})
			})
		})
	}


};
