let needDeleteLength;

exports.run = (client, message, args) => {
	if(message.member.roles.find(role => role.name === 'Admin' || role.name === 'Bot Controller')) {
		if (!args[0]) return message.reply('Set the number of messages you need to delete (1-100)');
		const clearnumber = parseInt(args[0]);
		if (clearnumber > 100) return message.reply('Set the number of messages you need to delete (1-100)');
		message.channel.send('Clearing messages...');
		clear(clearnumber).then;
		setTimeout(() => {
			message.channel.fetchMessages({ limit: 5 }).then(collected => {
				collected.forEach(msg => {
					if (msg.content.startsWith('Clearing')) msg.delete();
				});
			});
			message.reply(`${needDeleteLength} Messages Cleared!`);
		}, 3000);

	}
	else {
		message.reply('You do not have a permission to run this command.');
	}

	async function clear(clearnumber) {
		message.delete();
		const needDelete = [];
		await message.channel.fetchMessages({ limit: clearnumber }).then(collected => {
			collected.forEach(msg => {
				if (msg.content.startsWith('~') || msg.content.startsWith('!') || msg.author.bot) needDelete.push(msg);
			}

			);
			needDeleteLength = needDelete.length;
			message.channel.bulkDelete(needDelete);
		});
	}
};
