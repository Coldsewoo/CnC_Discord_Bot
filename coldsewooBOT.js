const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const {
  get
} = require('snekfetch');
const admin = require("firebase-admin");

const serviceAccount = require("firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cnc-discord-bot.firebaseio.com"
});


const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

client.on('ready', () => {
  client.user.setActivity('Use ~help for more info XD', { type: 'PLAYING' });
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

setInterval(function () {
  var facebookArray = new Array();
  try {
    get('https://www.facebook.com/pg/Idle-Online-Universe-IOU-RPG-320106674851481/posts/?ref=page_internal').then(res => {
      var content = res.body.toString();
      var codeFinder = "your codes"
      var codeEndFinder = "Cheers,"
      var codeIndex = content.indexOf(codeFinder);
      var codeEndIndex = content.indexOf(codeEndFinder);
      var codes = content.substring(codeIndex, codeEndIndex)
      var br = "<br />"
      var codesArray = codes.split(br);
      for (let i = 1; i < 3; i++) {
        codesArray[i] = codesArray[i].trim();
        facebookArray.push(codesArray[i]);
      }
      return facebookArray;
    }).then(facebookArray => {
      var msgArray = new Array();
      const channelId = "453517489561665536";
      const codeChannel = client.channels.get(channelId)

      codeChannel.fetchMessages({
        limit: 1
      }).then(collected => {
        collected.forEach(msg => {
          msgArray = msg.content.split(/\n/);
        })
        return Promise.resolve([facebookArray, msgArray])
      }).then(([facebookArray, msgArray]) => {
        if (!facebookArray.includes(msgArray[1])) {
          codeChannel.send(facebookArray);
        }
      })
    })
  } catch (err) {
    console.log(err);
  }
}, 30 * 60 * 1000);

client.login(config.token);
