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

    if (!args[0]) {
      message.reply(`You must type guild name (See !info help)`);
      return;
    }
    var guildname = args.shift().toLowerCase();
    if (guildname === 'br' || guildname === 'burningrage' || guildname === 'br') {
      guildname = 0;
    } else
    if (guildname === 'cs' || guildname === 'comingsoon' || guildname === 'coming') {
      guildname = 1;
    } else
    if (guildname === 'tc' || guildname === 'thecollectives' || guildname === 'the') {
      guildname = 2;
    } else
    if (guildname === 'im' || guildname === 'imaginarium') {
      guildname = 3;
    } else
    if (guildname === 'fa' || guildname === 'freshair' || guildname === 'fresh') {
      guildname = 4;
    } else
    if (guildname === 'ao' || guildname === 'alwaysonline' || guildname === 'always') {
      guildname = 5;
    } else
    if (guildname === 'help' ) {
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
              ex) !info AO, !info Alwaysonline
    `
            }
          ],

          footer: {
            icon_url:"https://cdn.discordapp.com/avatars/220499331344498688/28b6a51943316647b14adf1a3e84189f.png?size=128",
            text: `\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)`

          }
        }
      }).catch(function (err) {
        console.error(err);
      });
    } else
    {
      message.reply(`You must type correct guild name (See !info help)`);
      return;
    }
    if (guildname === 'help')
    {
      return;
    } else
    {
      //今日 午後9時45分
      //2018-11-01T13:35:28.550Z
      var month = guildsheet[7].substring(5,7);
      var day = guildsheet[7].substring(8,10);
      var hourstr1 = guildsheet[7].split('T');
      var hourstr2 = hourstr1[1].substring(0,9);
      var hourstr3 = hourstr2.split(':');
      hourstr3[0] = parseInt(hourstr3[0],10);
      hourstr3[0] = hourstr3[0] + 9 ;
      day = parseInt(day,10);

      if (hourstr3[0] > 24) {
        hourstr3[0] = hourstr3[0] - 24;
        day =  day + 1;
      }
      message.reply({embed: {
          color: `${guildinfo[guildname][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**${guildinfo[guildname][0]['guild_name']} guild information**`,
          fields: [
            {
              name: "+---------------------------------------------------------------------------------------+",
              value: `\`\`\`prolog
|  Building   |  Level  |  Building   |  Level  |\`\`\`\`\`\`css
| Guild Level |   ${guildsheet[guildname][2]}   | Wising Well |   ${guildsheet[guildname][3]}   |
| Stable      |   ${guildsheet[guildname][4]}   | Warehouse   |   ${guildsheet[guildname][9]}   |
| Fortress    |   ${guildsheet[guildname][5]}   | Altar       |   ${guildsheet[guildname][10]}   |
| Bank        |   ${guildsheet[guildname][6]}   | Library     |   ${guildsheet[guildname][11]}   |
| Sawmill     |   ${guildsheet[guildname][7]}   | Sac Tower   |   ${guildsheet[guildname][8]}   |
| Aquatic     |   ${guildsheet[guildname][12]}   | Space Aca.  |   ${guildsheet[guildname][13]}   |\`\`\`\`\`\`prolog\n| Total Stone - ${guildsheet[guildname][31]}\`\`\``
            },
            {
                    name: "+---------------------------------------------------------------------------------------+",
                    value: `**${guildinfo[guildname][0]['guild_name']} guild information**`
            }

          ],

          footer: {
            icon_url:"https://cdn.discordapp.com/avatars/220499331344498688/28b6a51943316647b14adf1a3e84189f.png?size=128",
            text: `Last updated on ${month}月${day}日 ${hourstr3[0]}時${hourstr3[1]}分 JST(GMT+9)`

          }
        }
      }).catch(function (err) {
        console.error(err);
      });

    }

});
}