const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if(message.member.roles.find(role => role.name === "Admin" || role.name === "Bot Controller"))
  {
    async function clear()
      {
        message.delete();
        var needDelete = [];
        message.channel.fetchMessages({limit: 100}).then(collected => { //collected is a Collection
        collected.forEach(msg => {
          if (msg.content.startsWith("~") || msg.content.startsWith("!")) needDelete.push(msg);
          if (msg.author.bot) needDelete.push(msg);
        });
        message.channel.bulkDelete(needDelete);
      });
      }
      message.channel.send("Clearing messages...");
      for (var i = 0; i < 6; i++)
      {
        setTimeout(() => {
          clear();
        }, 4000);
        i++;
      }
        setTimeout(() => {
          message.channel.fetchMessages({limit: 5}).then(collected => { //collected is a Collection
          collected.forEach(msg => {
            if (msg.content.startsWith("Clearing")) msg.delete();
          });
        })
          message.reply("Messages Cleared!");
        }, 10000);

  } else
  {
  message.reply("You do not have a permission to run this command.");
  }
}
