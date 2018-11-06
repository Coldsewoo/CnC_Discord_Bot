var path = require("path");
var fs = require("fs");

exports.run = (client, message, args) => {
  fs.readFile(path.join(__dirname, '..', 'json', 'guildinfo.json'), (err, rawdata_guildl) => {
  if (err) throw err;
  let guildinfo = JSON.parse(rawdata_guildl);
  console.log(guildinfo);
  if (args[0] === 'br' || args[0] === 'cs' || args[0] === 'tc' || args[0] === 'im'  || args[0] === 'fa' || args[0] === 'ao') {

      guildinfo[args[0]][0][`guild_level`] = args[1];
      guildinfo[args[0]][0][`guild_wishing_well`] = args[2];
      fs.writeFile(path.join(__dirname, '..', 'json', 'guildinfo.json'),JSON.stringify(guildinfo, null, 2), (err) => console.error);
      var time = new Date();
      message.channel.send(`Guild Level updated on ${time}`);
    } else
    message.channel.send(`You must type correct guild name (BR, CS, TC, IM, FA, AO)`);
    return;
  });
};
