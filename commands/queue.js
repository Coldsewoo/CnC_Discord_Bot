const guilds = {};

exports.run = (client, message, args) => {

	if (args[0]) args[0] = args[0].toLowerCase();
	const member = message.member.id;
	const content = message.content.split(' ').slice(2).join(' ');
	const member_Id = message.member.displayName;
	const isInNum = 1;
	const isNotInNum = 2;
	const numArray = ['Zero', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'];
	const leaderRole = ['BR Leadership', 'CS Leadership', 'The Collectives Leadership', 'Imaginarium Leadership', 'Fresh Air Leadership', 'Always Online Leadership', 'Admin'];
	const guildcolor = ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'];
	const guildname = ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'];
	let color;
	for (let i = 0; i < 6; i++) {
		if(message.member.roles.find(role => role.name === guildname[i])) {color = guildcolor[i];}
	}
	if (!color) color = guildcolor[6];

	if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.reply('You are not CnC member!');

	if(!guilds[message.channel.id]) {
		guilds[message.channel.id] = {
			queue: [],
			queueContent: [],
			queueId: [],
			isIn: [],
			maxIn: [1],
		};
	}

	if(!args[0] || args[0] === 'list') {
		message.delete();
		clearText(message);
		let message2 = '```css\n ';

		if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
			message2 += '[There is ONE free spot]\n';
		}
		else {
			message2 += `[There are ${numArray[guilds[message.channel.id].maxIn]} free spots]\n`;
		}

		if (guilds[message.channel.id].queueContent.length === 0) {

			if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
				message.reply('```css\n[There is ONE free spot]\nNo one is IN to the queue currently```');
			}
			else {
				message.reply(`\`\`\`css\n[There are ${numArray[guilds[message.channel.id].maxIn]} free spots]\nNo one is IN to the queue currently\`\`\``);
			}
		}
		else {
			for (let i = 0; i < guilds[message.channel.id].queueContent.length; i++) {
				const temp = (i + 1) + ': ' + guilds[message.channel.id].queue[i] + ' [' + guilds[message.channel.id].queueContent[i] + '] ' + (guilds[message.channel.id].isIn[i] === 1
					? '  ' + '<= current IN' : '') + '\n';
				if ((message2 + temp).length <= 2000 - 3) {
					message2 += temp;
				}
				else {
					message2 += '```';
					message.reply(message2);
					message2 = '```';
				}
			}
			message2 += '```';
			message.reply(message2);
		}
	}
	else
	if(args[0] === 'add') {
		clearText(message);
		add_to_queue(member, member_Id, content);
		message.reply('Added to Queue number:  ' + '**' + guilds[message.channel.id].queueContent.length + '**');
		queue_list(message);
	}
	else
	if(args[0] === 'delete' || args[0] === 'remove') {
		clearText(message);
		if(message.member.roles.find(role => leaderRole.indexOf(role.name) != -1)) {
			const deleteNum = message.content.split(' ').slice(2).join(' ');
			parseInt(deleteNum, 10);
			queue_delete(member, deleteNum, message);
		}
		else {
			message.reply('You do not have a permission to run this command');
		}
		queue_list(message);

	}
	else
	if(args[0] === 'insert') {
		clearText(message);
		queue_insert(member, member_Id, message);
		queue_list(message);
	}
	else
	if(args[0] === 'help') {
		message.delete();
		message.channel.send({ embed: {
			color: `${color}`,
			author: {
				name: 'Cows \'n\' Chaos',

			},
			title: '**Queue**',
			fields: [
				{
					name: 'Available Contents (use ~ before the desired command)\n',
					value: `\n\r
	*(__Only for INNER-GUILD PUSHES channels__!)*
	**HOW TO USE** (~queue or ~queue list to see current queue list)
	1) **~queue add IGN**
	2) **~queue in** (when you join the guild)
	3) **~queue out** (after your push done)

  ***List*** - Show current queue list
  ***Add*** - Add to the queue list
  *ex) ~queue add some_message*
  ***Insert*** - Insert into the queue list
  *ex) ~queue insert number some_message*
  ***IN*** - Flag yourself as being inside the guild
  ***Out*** - Delete your queue from the list

  __*For ADMINS*__
  ***Delete*** - Delete specific queue number on list
  *You can also use ~queue remove*
  *ex) ~queue delete 3*
  ***Clear*** - Clear whole queue list
  ***Max*** - Set the max IN available
  *-> Depends on current free spot(s)*
  *ex) ~queue max 2*
  \n\r
  `,
				},
			],

			footer: {
				icon_url:'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
				text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

			},
		},
		}).catch(function(err) {
			console.error(err);
		});
	}
	else
	if(args[0] === 'max') {
		if(message.member.roles.find(role => leaderRole.indexOf(role.name) != -1)) {
			parseInt(content, 10);
			if(content > 5) return message.reply('Max Number cant be more than 5');
			if(content > 0) {
				guilds[message.channel.id].maxIn.shift();
				guilds[message.channel.id].maxIn.push(content);
				message.reply('max IN set to: ' + '**' + content + '**');
			}
			else {
				return message.reply('Max number needs to be higher than 0');
			}
		}
		else {
			return message.reply('You do not have a permission to run this command.');
		}
	}
	else
	if(args[0] === 'clear') {
		clearText(message);
		if(message.member.roles.find(role => leaderRole.indexOf(role.name) != -1)) {
			guilds[message.channel.id].queueId = [];
			guilds[message.channel.id].queue = [];
			guilds[message.channel.id].queueContent = [];
			guilds[message.channel.id].isIn = [];
			message.reply('Queue list cleared!');
		}
		else {
			return message.reply('You do not have a permission to run this command.');
		}
	}
	else
	if(args[0] === 'out') {
		clearText(message);
		if(guilds[message.channel.id].queueId.length === 0 || guilds[message.channel.id].queueId.indexOf(member) === -1) {
			return message.reply('```prolog\nYou are not in the queue```');
			queue_list(message);
		}
		else {
			for(let i = 1; i < guilds[message.channel.id].queue.length + 1; i++) {
				if(guilds[message.channel.id].queue[i - 1] === member_Id) {
					queue_delete(member, i, message);
					queue_list(message);
					return;
				}
			}
		}
	}
	else
	if(args[0] === 'test') {
		message.delete();


		queue_list(message);

	}
	else
	if(args[0] === 'in') {
		clearText(message);
		if(guilds[message.channel.id].isIn.length === 0 || guilds[message.channel.id].queueId.indexOf(member) === -1) {
			message.reply('```prolog\nYou are not in the queue```');
			return queue_list(message);
		}
		else {
			let messageIn = '```prolog\n No free spot(s) left. Current IN -  \n';
			for(var i = 1; i < guilds[message.channel.id].queue.length + 1; i++) {
				const currentIn = guilds[message.channel.id].isIn.filter(j => j === isInNum).length;
				if (currentIn >= guilds[message.channel.id].maxIn) {
					if (guilds[message.channel.id].isIn[i - 1] === isInNum) {
						const temp2 =  '   ' + i + ' : ' + guilds[message.channel.id].queue[i - 1] + '  [' + guilds[message.channel.id].queueContent[i - 1] + ']\n';
						messageIn += temp2;
					}
				}
				else
				if(guilds[message.channel.id].queue[i - 1] === member_Id) {

					if (guilds[message.channel.id].isIn[i - 1] === isInNum) {
						message.reply('*You are already IN* with' + '**  ' + i + ' : ' + guilds[message.channel.id].queue[i - 1] + (guilds[message.channel.id].queueContent[i - 1] ? '  [' + guilds[message.channel.id].queueContent[i - 1] + ']**' : '**'));
						queue_list(message);
						return;
					}
					else {
						guilds[message.channel.id].isIn[i - 1] = 1;
						if(guilds[message.channel.id].queueContent[i - 1]) {
							message.reply('**' + guilds[message.channel.id].queue[i - 1] + ' [' + guilds[message.channel.id].queueContent[i - 1] + ']** is now **IN**');
							queue_list(message);
						}
						else {
							message.reply('*You are now* ***IN***');
							queue_list(message);
						}

						return;
					}

				}

			}
			messageIn += '```';
			message.reply(messageIn);
			messageIn = '```';
			queue_list(message);
		}
	}
	else {
		message.delete();
		message.reply('Wrong command! See ~queue help');
	}


	function add_to_queue(member, member_Id, content) {
		guilds[message.channel.id].queueId.push(member);
		guilds[message.channel.id].queue.push(member_Id);
		guilds[message.channel.id].queueContent.push(content);
		guilds[message.channel.id].isIn.push(isNotInNum);

	}

	async function queue_list(message) {

		let message2 = '```css\n ';

		if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
			message2 += '[There is ONE free spot]\n';
		}
		else {
			message2 += `[There are ${numArray[guilds[message.channel.id].maxIn]} free spots]\n`;
		}

		if (guilds[message.channel.id].queueContent.length === 0) {

			if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
				message.reply('```css\n[There is ONE free spot]\nNo one is IN to the queue currently```');
			}
			else {
				message.reply(`\`\`\`css\n[There are ${numArray[guilds[message.channel.id].maxIn]} free spots]\nNo one is IN to the queue currently\`\`\``);
			}
		}
		else {
			for (let i = 0; i < guilds[message.channel.id].queueContent.length; i++) {
				const temp = (i + 1) + ': ' + guilds[message.channel.id].queue[i] + ' [' + guilds[message.channel.id].queueContent[i] + '] ' + (guilds[message.channel.id].isIn[i] === 1
					? '  ' + '<= current IN' : '') + '\n';
				if ((message2 + temp).length <= 2000 - 3) {
					message2 += temp;
				}
				else {
					message2 += '```';
					await	message.reply(message2);
					message2 = '```';
				}
			}
			message2 += '```';
			await	message.reply(message2);
		}

	}


	function queue_delete(member, deleteNum, message) {
		let lastqueue = guilds[message.channel.id].queueContent.length;
		if (deleteNum && deleteNum > 1) {
			if (deleteNum > guilds[message.channel.id].queueContent.length) {
				message.reply('deleteNum > queue length');
				return;
			}
			else

			if(parseInt(deleteNum, 10) === parseInt(lastqueue, 10)) {
				message.reply('Queue on ' + '**' + deleteNum + ' : ' + guilds[message.channel.id].queue[lastqueue - 1] + (guilds[message.channel.id].queueContent[lastqueue - 1] ? '  [' + guilds[message.channel.id].queueContent[lastqueue - 1] + ']**' : '**') + ' deleted!');
				guilds[message.channel.id].queueId.length--;
				guilds[message.channel.id].queue.length--;
				guilds[message.channel.id].queueContent.length--;
				guilds[message.channel.id].isIn.length--;
				lastqueue--;
			}
			else {
				let deletedId = undefined;
				const deleteContent = undefined;
				for (let i = deleteNum - 1; i < guilds[message.channel.id].queue.length - 1 ; i++) {
					if (i === guilds[message.channel.id].queue.length - 2) {
						message.reply('Queue on ' + '**' + deleteNum + ' : ' + (deletedId ? deletedId : guilds[message.channel.id].queue[i]) + (guilds[message.channel.id].queueContent[i] ? '  [' + guilds[message.channel.id].queueContent[i] + ']**' : '**') + ' deleted!');
						guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i + 1];
						guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i + 1];
						guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i + 1];
						guilds[message.channel.id].isIn[i] = guilds[message.channel.id].isIn[i + 1];
						guilds[message.channel.id].queueId[i + 1] = [];
						guilds[message.channel.id].queue[i + 1] = [];
						guilds[message.channel.id].queueContent[i + 1] = [];
						guilds[message.channel.id].isIn[i + 1] = [];
					}
					else {
						deletedId = guilds[message.channel.id].queue[i];
						const deletedContent = guilds[message.channel.id].queueContent[i];
						guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i + 1];
						guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i + 1];
						guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i + 1];
						guilds[message.channel.id].isIn[i] = guilds[message.channel.id].isIn[i + 1];
					}
				}
				guilds[message.channel.id].queueId.length--;
				guilds[message.channel.id].queue.length--;
				guilds[message.channel.id].queueContent.length--;
				guilds[message.channel.id].isIn.length--;
				lastqueue--;

			}
		}
		else
		if (guilds[message.channel.id].queue.length === 0) {
			guilds[message.channel.id].queueId = [];
			guilds[message.channel.id].queue = [];
			guilds[message.channel.id].queueContent = [];
			guilds[message.channel.id].isIn = [];
			lastqueue = 0;
		}
		else
		if (deleteNum > 0) {
			message.reply('Queue on ' + '**' + '1' + ' : ' + guilds[message.channel.id].queue[0] + (guilds[message.channel.id].queueContent[0] ? '  [' + guilds[message.channel.id].queueContent[0] + ']**' : '**') + ' deleted!');
			guilds[message.channel.id].queueId.shift();
			guilds[message.channel.id].queue.shift();
			guilds[message.channel.id].queueContent.shift();
			guilds[message.channel.id].isIn.shift();
			lastqueue--;
		}
		else {
			message.reply('Queue on ' + '**' + lastqueue + ' : ' + guilds[message.channel.id].queue[lastqueue - 1] + (guilds[message.channel.id].queueContent[lastqueue - 1] ? '  [' + guilds[message.channel.id].queueContent[lastqueue - 1] + ']**' : '**') + ' deleted!');
			guilds[message.channel.id].queueId.length--;
			guilds[message.channel.id].queue.length--;
			guilds[message.channel.id].queueContent.length--;
			guilds[message.channel.id].isIn.length--;
			lastqueue--;
		}

	}

	function queue_insert(member, member_Id, message) {
		const contents  = message.content.split(' ').slice(3).join(' ');
		var switchNum = args[1];
		switchNum = parseInt(switchNum, 10);
		if (guilds[message.channel.id].queue.length === 0) {
			add_to_queue(member, member_Id, content);
			message.reply('Added to Queue number:  ' + '**' + guilds[message.channel.id].queueContent.length + '**');


		}else
		if (switchNum && switchNum > 0) {
			if (switchNum > guilds[message.channel.id].queueContent.length) {
				message.reply(`Current max queue number is : ${guilds[message.channel.id].queueContent.length}`);
				return;
			}
			else {
				guilds[message.channel.id].queueId.splice(switchNum - 1, 0, member);
				guilds[message.channel.id].queue.splice(switchNum - 1, 0, member_Id);
				guilds[message.channel.id].queueContent.splice(switchNum - 1, 0, contents);
				guilds[message.channel.id].isIn.splice(switchNum - 1, 0, '0');
				message.reply('Inserted to Queue number:  ' + '**' + switchNum + (guilds[message.channel.id].queueContent[switchNum - 1] ? '  [' + guilds[message.channel.id].queueContent[switchNum - 1] + ']**' : '**'));
			}
		}

		else {return;}
	}

	async function clearText(message) {
		message.delete();
		const needDelete = [];
		await message.channel.fetchMessages({ limit: 10 }).then(collected => {
			collected.forEach(msg => {
				if (msg.author.bot && msg.content.startsWith("<@")) {
					needDelete.push(msg);
				}
			});
		message.channel.bulkDelete(needDelete);
		});
	}

	async function clear() {
		message.delete();
		const needDelete = [];
		await message.channel.fetchMessages({ limit: 10 }).then(collected => {
			collected.forEach(msg => {
				if(msg.type === 'PINS_ADD') needDelete.push(msg);
			}

			);
			needDeleteLength = needDelete.length;
			message.channel.bulkDelete(needDelete);
		});
	}

};
