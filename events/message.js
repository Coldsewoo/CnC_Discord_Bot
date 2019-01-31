
module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot && message.author.id == "509201572949917720") return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  var args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
};
