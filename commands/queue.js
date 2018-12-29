const guilds = {};
const global = require('../global.js');
const Global = global.Global;

exports.run = (client, message, args) => {
	const hasLeaderRole = message.member.roles.some(roles => {
		return Global.leaderRole.includes(roles.name);
	})

	if (args[0]) args[0] = args[0].toLowerCase();
	const member = message.member.id;
	const content = message.content.split(' ').slice(2).join(' ');
	const member_Id = message.member.displayName;
	const isInNum = 1;
	const isNotInNum = 2;
	let color;
	for (let i = 0; i < 6; i++) {
		if (message.member.roles.find(role => role.name === Global.guildRole[i])) {
			color = Global.guildColor[i];
		}
	}
	if (!color) color = Global.guildColor[6];

	if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.reply('You are not CnC member!');

	if (!guilds[message.channel.id]) {
		guilds[message.channel.id] = {
			queue: [],
			queueContent: [],
			queueId: [],
			isIn: [],
			maxIn: [1],
		};
	}

	if (!args[0] || args[0] === 'list') {
		clearText(message);
		queue_list(message);
		/* let message2 = '```css\n ';

		if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
			message2 += '[There is ONE free spot]\n';
		}
		else {
			message2 += `[There are ${Global.numArray[guilds[message.channel.id].maxIn]} free spots]\n`;
		}

		if (guilds[message.channel.id].queueContent.length === 0) {

			if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
				message.reply('```css\n[There is ONE free spot]\nNo one is IN to the queue currently```');
			}
			else {
				message.reply(`\`\`\`css\n[There are ${Global.numArray[guilds[message.channel.id].maxIn]} free spots]\nNo one is IN to the queue currently\`\`\``);
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
		} */
	} else
	if (args[0] === 'add') {
		clearText(message);
		add_to_queue(member, member_Id, content);
		message.reply('Added to Queue number:  ' + '**' + guilds[message.channel.id].queueContent.length + '**');
		queue_list(message);
	} else
	if (args[0] === 'setin') {
		if (hasLeaderRole == false) return message.reply('You do not have a permission to run this command');
		clearText(message);
		var setinNum = message.content.split(' ').slice(2).join(' ');
		setinNum = parseInt(setinNum, 10);
		if (setinNum > guilds[message.channel.id].queueContent.length) {
			message.reply('setinNum > queue length');
			queue_list(message);
			return;
		} else {
			let messageIn = '```prolog\n No free spot(s) left. Current IN -  \n';
			for (let i = 1; i < guilds[message.channel.id].queue.length + 1; i++) {
				const currentIn = guilds[message.channel.id].isIn.filter(j => j === isInNum).length;
				if (currentIn >= guilds[message.channel.id].maxIn) {
					if (guilds[message.channel.id].isIn[i - 1] === isInNum) {
						const temp2 = '   ' + i + ' : ' + guilds[message.channel.id].queue[i - 1] + '  [' + guilds[message.channel.id].queueContent[i - 1] + ']\n';
						messageIn += temp2;
					}
				} else {
					guilds[message.channel.id].isIn[setinNum - 1] = isInNum;
					message.reply('**' + guilds[message.channel.id].queue[setinNum - 1] + ' [' + guilds[message.channel.id].queueContent[setinNum - 1] + ']** is now **IN**');
					queue_list(message);
					return;
				}
			}
			messageIn += '```';
			message.reply(messageIn);
			messageIn = '```';
			queue_list(message);
		}
	} else
	if (args[0] === 'delete' || args[0] === 'remove') {
		clearText(message);
		if (hasLeaderRole == true) {
			var deleteNum = message.content.split(' ').slice(2).join(' ');
			deleteNum = parseInt(deleteNum, 10);
			queue_delete(member, deleteNum, message);
		} else {
			message.reply('You do not have a permission to run this command');
		}
		queue_list(message);

	} else
	if (args[0] === 'insert') {
		clearText(message);
		queue_insert(member, member_Id, message);
		queue_list(message);
	} else
	if (args[0] === 'help') {
		message.delete();
		message.channel.send({
			embed: {
				color: `${color}`,
				author: {
					name: 'Cows \'n\' Chaos',

				},
				title: '**Queue**',
				fields: [{
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
	***setIn*** - Flag specific queue number on list as IN
	*ex) ~queue setIn 3*
  ***Delete*** - Delete specific queue number on list
  *You can also use ~queue remove*
  *ex) ~queue delete 3*
  ***Clear*** - Clear whole queue list
  ***Max*** - Set the max IN available
  *-> Depends on current free spot(s)*
  *ex) ~queue max 2*
  \n\r
  `,
				}, ],

				footer: {
					icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
					text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

				},
			},
		}).catch(function(err) {
			console.error(err);
		});
	} else
	if (args[0] === 'max') {
		if (hasLeaderRole == true) {
			parseInt(content, 10);
			if (content > 5) return message.reply('Max Number cannot be more than 5');
			if (content > 0) {
				guilds[message.channel.id].maxIn.shift();
				guilds[message.channel.id].maxIn.push(content);
				message.reply('max IN set to: ' + '**' + content + '**');
			} else {
				return message.reply('Max number needs to be higher than 0');
			}
		} else {
			return message.reply('You do not have a permission to run this command.');
		}
	} else
	if (args[0] === 'clear') {
		clearText(message);
		if (hasLeaderRole == true) {
			guilds[message.channel.id].queueId = [];
			guilds[message.channel.id].queue = [];
			guilds[message.channel.id].queueContent = [];
			guilds[message.channel.id].isIn = [];
			message.reply('Queue list cleared!');
			queue_list(message);
			return;
		} else {
			return message.reply('You do not have a permission to run this command.');
		}
	} else
	if (args[0] === 'out') {
		clearText(message);
		if (guilds[message.channel.id].queueId.length === 0 || guilds[message.channel.id].queueId.indexOf(member) === -1) {
			message.reply('```prolog\nYou are not in the queue```');
			queue_list(message);
			return;
		} else {
			for (let i = 1; i < guilds[message.channel.id].queue.length + 1; i++) {
				if (guilds[message.channel.id].queue[i - 1] === member_Id) {
					queue_delete(member, i, message);
					queue_list(message);
					return;
				}
			}
		}
	} else
	if (args[0] === 'test') {
		message.delete();
		console.log(message.channel.id);
		for (let i = 0; i < guilds[message.channel.id].queue.length; i++) {
			let j = i + 1;
			console.log(j + ' - ' + guilds[message.channel.id].queue[i] + '(' + guilds[message.channel.id].queueId[i] + ')' + ' : ' + guilds[message.channel.id].queueContent[i]);
		}
		queue_list(message);

	} else
	if (args[0] === 'in') {
		clearText(message);
		if (guilds[message.channel.id].isIn.length === 0 || guilds[message.channel.id].queueId.indexOf(member) === -1) {
			message.reply('```prolog\nYou are not in the queue```');
			return queue_list(message);
		} else {
			let messageIn = '```prolog\n No free spot(s) left. Current IN -  \n';
			for (let i = 1; i < guilds[message.channel.id].queue.length + 1; i++) {
				const currentIn = guilds[message.channel.id].isIn.filter(j => j === isInNum).length;
				if (currentIn >= guilds[message.channel.id].maxIn) {
					if (guilds[message.channel.id].isIn[i - 1] === isInNum) {
						const temp2 = '   ' + i + ' : ' + guilds[message.channel.id].queue[i - 1] + '  [' + guilds[message.channel.id].queueContent[i - 1] + ']\n';
						messageIn += temp2;
					}
				} else
				if (guilds[message.channel.id].queue[i - 1] === member_Id) {
					if (guilds[message.channel.id].isIn[i - 1] === isInNum) {
						message.reply('*You are already IN* with' + '**  ' + i + ' : ' + guilds[message.channel.id].queue[i - 1] + (guilds[message.channel.id].queueContent[i - 1] ? '  [' + guilds[message.channel.id].queueContent[i - 1] + ']**' : '**'));
						queue_list(message);
						return;
					} else {
						guilds[message.channel.id].isIn[i - 1] = 1;
						if (guilds[message.channel.id].queueContent[i - 1]) {
							message.reply('**' + guilds[message.channel.id].queue[i - 1] + ' [' + guilds[message.channel.id].queueContent[i - 1] + ']** is now **IN**');
							queue_list(message);
						} else {
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
	} else {
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
		} else {
			message2 += `[There are ${Global.numArray[guilds[message.channel.id].maxIn]} free spots]\n`;
		}

		if (guilds[message.channel.id].queueContent.length === 0) {

			if (parseInt(guilds[message.channel.id].maxIn, 10) === 1) {
				message.reply('```css\n[There is ONE free spot]\nNo one is IN to the queue currently```');
			} else {
				message.reply(`\`\`\`css\n[There are ${Global.numArray[guilds[message.channel.id].maxIn]} free spots]\nNo one is IN to the queue currently\`\`\``);
			}
		} else {
			for (let i = 0; i < guilds[message.channel.id].queueContent.length; i++) {
				const temp = (i + 1) + ': ' + guilds[message.channel.id].queue[i] + ' [' + guilds[message.channel.id].queueContent[i] + '] ' + (guilds[message.channel.id].isIn[i] === 1 ?
					'  ' + '<= current IN' : '') + '\n';
				if ((message2 + temp).length <= 2000 - 3) {
					message2 += temp;
				} else {
					message2 += '```';
					await message.reply(message2);
					message2 = '```';
				}
			}
			message2 += '```';
			await message.reply(message2);
		}

	}


	function queue_delete(member, deleteNum, message) {
		deleteNum = parseInt(deleteNum, 10);
		let queueLength = guilds[message.channel.id].queueContent.length;
		let deletedName = guilds[message.channel.id].queue;
		let deletedContent = guilds[message.channel.id].queueContent;
		if (deleteNum && deleteNum >= 1) {
			if (deleteNum > queueLength) {
				return message.reply('Current max queue number is : ' + queueLength);
			} else {
				message.reply('Queue on ' + '**' + deleteNum + ' : ' + deletedName[deleteNum - 1] + (deletedContent[deleteNum - 1] ? '  [' + deletedContent[deleteNum - 1] + ']**' : '**') + ' deleted!');
				guilds[message.channel.id].queueId.splice(deleteNum - 1, 1);
				guilds[message.channel.id].queue.splice(deleteNum - 1, 1);
				guilds[message.channel.id].queueContent.splice(deleteNum - 1, 1);
				guilds[message.channel.id].isIn.splice(deleteNum - 1, 1);
			}
		} else {
			return message.reply('Please set appropriate delete number ' + (queueLength > 1 ? '[ 1 ~  ' + queueLength + ' ]' : " [ 1 ]"));
		}

	}


	// dumb way
	// 	if(parseInt(deleteNum, 10) === parseInt(lastqueue, 10)) {
	// 		message.reply('Queue on ' + '**' + deleteNum + ' : ' + guilds[message.channel.id].queue[lastqueue - 1] + (guilds[message.channel.id].queueContent[lastqueue - 1] ? '  [' + guilds[message.channel.id].queueContent[lastqueue - 1] + ']**' : '**') + ' deleted!');
	// 		guilds[message.channel.id].queueId.length--;
	// 		guilds[message.channel.id].queue.length--;
	// 		guilds[message.channel.id].queueContent.length--;
	// 		guilds[message.channel.id].isIn.length--;
	// 		lastqueue--;
	// 	}
	// 	else {
	// 		const deletedName = guilds[message.channel.id].queue[deleteNum - 1];
	// 		const deletedContent = guilds[message.channel.id].queueContent[deleteNum - 1].slice();
	// 		for (let i = deleteNum - 1; i < guilds[message.channel.id].queue.length - 1 ; i++) {
	// 			if (i === guilds[message.channel.id].queue.length - 2) {
	// 				guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i + 1];
	// 				guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i + 1];
	// 				guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i + 1];
	// 				guilds[message.channel.id].isIn[i] = guilds[message.channel.id].isIn[i + 1];
	// 				guilds[message.channel.id].queueId[i + 1] = [];
	// 				guilds[message.channel.id].queue[i + 1] = [];
	// 				guilds[message.channel.id].queueContent[i + 1] = [];
	// 				guilds[message.channel.id].isIn[i + 1] = [];
	// 			}
	// 			else {
	// 				guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i + 1];
	// 				guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i + 1];
	// 				guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i + 1];
	// 				guilds[message.channel.id].isIn[i] = guilds[message.channel.id].isIn[i + 1];
	// 			}
	// 		}
	// 		guilds[message.channel.id].queueId.length--;
	// 		guilds[message.channel.id].queue.length--;
	// 		guilds[message.channel.id].queueContent.length--;
	// 		guilds[message.channel.id].isIn.length--;
	// 		lastqueue--;
	// 		message.reply('Queue on ' + '**' + deleteNum + ' : ' + deletedName + (deletedContent ? '  [' + deletedContent + ']**' : '**') + ' deleted!');
	// 	}
	// }
	// else
	// if (guilds[message.channel.id].queue.length === 0) {
	// 	guilds[message.channel.id].queueId = [];
	// 	guilds[message.channel.id].queue = [];
	// 	guilds[message.channel.id].queueContent = [];
	// 	guilds[message.channel.id].isIn = [];
	// 	lastqueue = 0;
	// }
	// else
	// if (deleteNum > 0) {
	// 	message.reply('Queue on ' + '**' + '1' + ' : ' + guilds[message.channel.id].queue[0] + (guilds[message.channel.id].queueContent[0] ? '  [' + guilds[message.channel.id].queueContent[0] + ']**' : '**') + ' deleted!');
	// 	guilds[message.channel.id].queueId.shift();
	// 	guilds[message.channel.id].queue.shift();
	// 	guilds[message.channel.id].queueContent.shift();
	// 	guilds[message.channel.id].isIn.shift();
	// 	lastqueue--;
	// }
	// else {
	// 	message.reply('Queue on ' + '**' + lastqueue + ' : ' + guilds[message.channel.id].queue[lastqueue - 1] + (guilds[message.channel.id].queueContent[lastqueue - 1] ? '  [' + guilds[message.channel.id].queueContent[lastqueue - 1] + ']**' : '**') + ' deleted!');
	// 	guilds[message.channel.id].queueId.length--;
	// 	guilds[message.channel.id].queue.length--;
	// 	guilds[message.channel.id].queueContent.length--;
	// 	guilds[message.channel.id].isIn.length--;
	// 	lastqueue--;
	// }



	function queue_insert(member, member_Id, message) {
		const contents = message.content.split(' ').slice(3).join(' ');
		let switchNum = args[1];
		switchNum = parseInt(switchNum, 10);
		if (guilds[message.channel.id].queue.length === 0) {
			add_to_queue(member, member_Id, content);
			message.reply('Added to Queue number:  ' + '**' + guilds[message.channel.id].queueContent.length + '**');


		} else
		if (switchNum && switchNum > 0) {
			if (switchNum > guilds[message.channel.id].queueContent.length) {
				message.reply(`Current max queue number is : ${guilds[message.channel.id].queueContent.length}`);
				return;
			} else {
				guilds[message.channel.id].queueId.splice(switchNum - 1, 0, member);
				guilds[message.channel.id].queue.splice(switchNum - 1, 0, member_Id);
				guilds[message.channel.id].queueContent.splice(switchNum - 1, 0, contents);
				guilds[message.channel.id].isIn.splice(switchNum - 1, 0, '0');
				message.reply('Inserted to Queue number:  ' + '**' + switchNum + (guilds[message.channel.id].queueContent[switchNum - 1] ? '  [' + guilds[message.channel.id].queueContent[switchNum - 1] + ']**' : '**'));
			}
		} else {
			return;
		}
	}

	async function clearText(message) {
		message.delete();
		const needDelete = [];
		await message.channel.fetchMessages({
			limit: 20
		}).then(collected => {
			collected.forEach(msg => {
				if (msg.author.bot && msg.content.startsWith('<@')) {
					needDelete.push(msg);
				}
			});
			message.channel.bulkDelete(needDelete);
		});
	}


};