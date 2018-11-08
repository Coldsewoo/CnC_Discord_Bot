const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if(message.member.roles.find(role => role.name === "Admin"))
  {
    message.channel.fetchMessages({limit: 30}).then(collected => { //collected is a Collection
    collected.forEach(msg => {
      if (msg.content.startsWith("~") || msg.content.startsWith("!")) msg.delete();
      if (msg.author.bot) msg.delete();
    });
  }).then(() => {
    message.reply("Messages Cleared!");
  });
} else {
  message.reply("You do not have a permission to run this command.")
}
}