exports.run = (client, message, args) => {
	if(message.member.roles.find(role => role.name === 'Bot Controller')) {
		if(!args || args.size < 1) return message.reply ('Must provide a command name to realod.');
		const commandName = args[0];
		// Check if the commands exists and is invalid
		if(!client.commands.has(commandName)) {
			return message.reply('That command does not exiest');
		}
		// the path is relative to the *current folder*, so just ./filename.js
		delete require.cache[require.resolve(`./${commandName}.js`)];
		// We also need to delete and reload the command from the client.commands enmap
		client.commands.delete(commandName);
		const props = require(`./${commandName}.js`);
		client.commands.set(commandName, props);
		message.reply(`The command ${commandName} has been reloaded`);
	}
	else {
		message.reply('You do not have a permission to run this command.');
	}

};
