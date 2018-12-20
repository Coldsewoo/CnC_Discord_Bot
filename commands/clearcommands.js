const global = require('../global.js')
const Global = global.Global;

exports.run = (client, message, args) => {
	const hasAdminRole = message.member.roles.some(roles => {return Global.adminRole.includes(roles.name);});
	if(hasAdminRole == false) return message.reply("You do not have a permission to run this command");
  async function clear(){
    let fetched;
    let needDelete = [];
    var messageNum = 0;
    var clearedNum = 0;
    let messageLimit = args[0];
    do {
      try {
        let fetchLimit = 100;
        if (messageLimit < 100) fetchLimit = messageLimit;
        fetched = await message.channel.fetchMessages({limit: fetchLimit});
        fetched.forEach(msg => {
          if(msg.content.startsWith('!') || msg.content.startsWith('~') || msg.author.bot) needDelete.push(msg);
        })
        clearedNum += needDelete.length;
        messageNum += fetched.size;
        await message.channel.bulkDelete(needDelete);
      } catch (error) {
        console.log(error);
        return message.channel.send("deleted " + clearedNum + " messages! (Cannot delete messages Older than 2 weeks!)");
      }
    }
    while(fetched.size >= 2 && messageNum < messageLimit);
    message.channel.send("Deleted " + clearedNum + " messages!");
    setTimeout(() => {
			message.channel.fetchMessages({ limit: 5 }).then(collected => {
				collected.forEach(msg => {
					if (msg.content.startsWith('Deleted')) msg.delete();
				});
			});
		}, 5000);
  }



  try {
    clear();
} catch (error) {
    console.log("API ERROR :" + error);
}

}
