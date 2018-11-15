var fs = require('fs');
var path = require('path');
var obj;


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
    var monthEng = ["XD", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.reply("You are not CnC member!");
    var guildcolor;
    if(message.member.roles.find(role => role.name === "BR"))
    {
    guildcolor = "14713377";
    } else
    if(message.member.roles.find(role => role.name === "CS"))
    {
    guildcolor = "7382744";
    } else
    if(message.member.roles.find(role => role.name === "The Collectives"))
    {
    guildcolor = "951659";
    } else
    if(message.member.roles.find(role => role.name === "Imaginarium"))
    {
    guildcolor = "9984690";
    } else
    if(message.member.roles.find(role => role.name === "Fresh Air"))
    {
    guildcolor = "3407751";
    } else
    if(message.member.roles.find(role => role.name === "Always Online"))
    {
    guildcolor = "16398164";
    } else
    {
    guildcolor = "16312092";
    }
    if (!args[0]) {
      message.reply({embed: {
          color: `${guildcolor}`,
          author: {
            name: `Info`,

                  },
          title: `Shows Guild Level Information`,
          fields: [
            {
              name: "Available Contents",
              value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~info AO, ~info Alwaysonline
    `
            }
          ],

          footer: {
            icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
            text: `\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)`

          }
        }
      }).catch(function (err) {
        console.error(err);
      });
      return;
    }
    var guildname = args.shift().toLowerCase();
    if (['br','burningrage','burning'].indexOf(guildname) >= 0) {
      guildname = 0;
    } else
    if (['cs','comingsoon','coming'].indexOf(guildname) >= 0) {
      guildname = 1;
    } else
    if (['tc','thecollectives','the'].indexOf(guildname) >= 0) {
      guildname = 2;
    } else
    if (['im','imaginarium'].indexOf(guildname) >= 0) {
      guildname = 3;
    } else
    if (['fa','freshair','fresh'].indexOf(guildname) >= 0) {
      guildname = 4;
    } else
    if (['ao','alwaysonline','always'].indexOf(guildname) >= 0) {
      guildname = 5;
    } else
    if (guildname === 'help') {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: `Info`,

                  },
          title: `Shows Guild Level Information`,
          fields: [
            {
              name: "Available Contents",
              value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~info AO, ~info Alwaysonline
    `
            }
          ],

          footer: {
            icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
            text: `\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)`

          }
        }
      }).catch(function (err) {
        console.error(err);
      });
    } else
    if (guildname === 'cold' || 'coldsewoo')
    {
      message.reply(":hello:");
      return;
    } else
    {
      message.reply(`You must type correct guild name (See ~info help)`);
      return;
    }
    if (guildname === 'help')
    {
      return;
    } else
    {
      //今日 午後9時45分
      //2018-11-01T13:35:28.550Z
      if(!guildsheet[8]) {
        message.reply(" *Please* **~update** *first*");
        return;
      }

      message.reply({embed: {
          color: `${guildinfo[guildname][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**${guildinfo[guildname][0]['guild_name']} guild information**`,
          fields: [
            {
              name: "**             Building                        Level**",
              value: `\`\`\`css
 Guild Level  -   ${guildsheet[guildname][2]}    \n Wising Well  -   ${guildsheet[guildname][3]}
 Stable       -   ${guildsheet[guildname][4]}    \n Fortress     -   ${guildsheet[guildname][5]}
 Bank         -   ${guildsheet[guildname][6]}    \n Sawmill      -   ${guildsheet[guildname][7]}
 Sac Tower    -   ${guildsheet[guildname][8]}    \n Warehouse    -   ${guildsheet[guildname][9]}
 Altar        -   ${guildsheet[guildname][10]}    \n Library      -   ${guildsheet[guildname][11]}
 Aquatic      -   ${guildsheet[guildname][12]}    \n Space Aca.   -   ${guildsheet[guildname][13]}     \`\`\`\`\`\`prolog\n Total Stone - ${guildsheet[guildname][35]}\`\`\``
            }
          ],

          footer: {
            icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
            text: `Last updated on ${guildsheet[8][1]}月${guildsheet[8][2]}日 ${guildsheet[8][3]}時${guildsheet[8][4]}分 JST(GMT+9)`

          }
        }
      }).catch(function (err) {
        console.error(err);
      });

    }

});
}
