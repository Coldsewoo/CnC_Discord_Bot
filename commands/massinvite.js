var fs = require('fs');
var path = require('path');

exports.run = (client, message, args) => {
  fs.readFileAsync = function (fileName) {
    return new Promise(function (resolve, reject) {
      try {
        fs.readFile(fileName, function(err, buffer) {
          if (err) reject(err); else resolve(buffer);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  function getJSONAsync(Name) {
    return fs.readFileAsync(path.join(__dirname, '..', 'json', Name + '.json'));
  }

  var JSONnames = ['guildinfo','IOU_guild','guildsheet'].map(getJSONAsync);
  Promise.all(JSONnames).then(function (JSONBuffers){
    guildinfo = JSON.parse(JSONBuffers[0]);
    IOU_guild = JSON.parse(JSONBuffers[1]);
    guildsheet = JSON.parse(JSONBuffers[2]);
    if (!message.member.roles.find(role => role.name === "Bot_controler") && !message.member.roles.find(role => role.name === "Bot Controller")) return;

    message.delete();
    message.channel.fetchPinnedMessages()
    .then(collected => { //collected is a Collection
        collected.forEach(msg => {
          if (msg.author.bot) msg.delete();
        })
  }).catch(console.error);


    var monthEng = ["XD", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var result = guildsheet[8][2] % 10;
    if (result === 1) {
      guildsheet[8][2] += "th";
    } else
    if (result === 2) {
      guildsheet[8][2] += "nd";
    } else
    if (result === 3) {
      guildsheet[8][2] += "rd";
    } else {
      guildsheet[8][2] += "th";
    }
    if (guildsheet[8][3] > 11) {
      if (guildsheet[8][3] === 12) {
        guildsheet[8][4] += "PM";
      } else {
        guildsheet[8][3] = guildsheet[8][3] - 12;
        guildsheet[8][4] += "PM";
      }
    } else {
        guildsheet[8][4] += "AM";
    }
    async function massinvites() {
    await  message.channel.send({embed: {
          color: 16398164,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**${guildinfo[5][0]['guild_name']}**`,
          fields:
          [
            {
              name: "**Mass Invite Updater**",
              value: `\`\`\`java\n Mass Invites sent. If you need to be Added to the List,TAG or send DM to @Coldsewoo\`\`\``
            },
            {
              name: "**         Building                        Level**",
              value: `\`\`\`css
Guild Level  -   ${guildsheet[5][2]}    \nWising Well  -   ${guildsheet[5][3]}
Stable       -   ${guildsheet[5][4]}    \nFortress     -   ${guildsheet[5][5]}
Bank         -   ${guildsheet[5][6]}    \nSawmill      -   ${guildsheet[5][7]}
Sac Tower    -   ${guildsheet[5][8]}    \nWarehouse    -   ${guildsheet[5][9]}
Altar        -   ${guildsheet[5][10]}    \nLibrary      -   ${guildsheet[5][11]}
Aquatic      -   ${guildsheet[5][12]}    \nSpace Aca.   -   ${guildsheet[5][13]}     \`\`\`\`\`\`prolog\n Total Stone - ${guildsheet[5][35]}\`\`\``
            }
          ],
            footer: {
            icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
            text: `Last updated on ${monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`
          }
        }
      });
    }
    massinvites().then(() => {
      message.channel.fetchMessages({limit: 1})
    .then(collected => { //collected is a Collection
    collected.forEach(msg => {
    if (msg.author.bot) msg.pin();
  })
  }).catch(console.error);
    });
});
}
