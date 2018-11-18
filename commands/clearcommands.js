exports.run = (client, message, args) => {
	if(message.member.roles.find(role => role.name === 'Admin' || role.name === 'Bot Controller')) {

		message.channel.send('Clearing messages...');
		clear();

		setTimeout(() => {
			message.channel.fetchMessages({ limit: 5 }).then(collected => {
				collected.forEach(msg => {
					if (msg.content.startsWith('Clearing')) msg.delete();
				});
			});
			message.reply('Messages Cleared!');
		}, 3000);

	}
	else {
		message.reply('You do not have a permission to run this command.');
	}

	async function clear() {
		message.delete();
		const needDelete = [];
		message.channel.fetchMessages({ limit: 100 }).then(collected => {
			collected.forEach(msg => {
				if (msg.content.startsWith('~') || msg.content.startsWith('!') || msg.author.bot) needDelete.push(msg);
			}

			);
			message.channel.bulkDelete(needDelete);
		});
	}
};
