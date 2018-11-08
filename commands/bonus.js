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
      message.channel.send({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Bonus",

                  },
          title: `Shows Guild Bonus (except for personal guild bonus)`,
          fields: [
            {
              name: "Available Contents\n",
              value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) !bonus AO, !bonus Alwaysonline
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
    if (guildname === 'br' || guildname === 'burningrage' || guildname === 'burning') {
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
    if (guildname === 'help') {
      message.channel.send({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Bonus",

                  },
          title: `Shows Guild Bonus (except for personal guild bonus)`,
          fields: [
            {
              name: "Available Contents\n",
              value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) !bonus AO, !bonus Alwaysonline
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
    {
      message.channel.send(`You must type correct guild name (See !bonus help)`);
      return;
    }

if (guildname === 'help')
{
  return;
} else
{
  if(!guildsheet[8]) {
    message.reply(" *Please* **!UPDATE** *first*");
    return;
  } else {
    var month = guildsheet[8].substring(5,7);
    var day = guildsheet[8].substring(8,10);
    var hourstr1 = guildsheet[8].split('T');
    var hourstr2 = hourstr1[1].substring(0,9);
    var hourstr3 = hourstr2.split(':');
    hourstr3[0] = parseInt(hourstr3[0],10);
    hourstr3[0] = hourstr3[0] + 9 ;
    day = parseInt(day,10);

    if (hourstr3[0] > 24) {
      hourstr3[0] = hourstr3[0] - 24;
      day =  day + 1;
  };
  }
  message.reply({embed: {
      color: `${guildinfo[guildname][0]['guild_color']}`,
      author: {
        name: "Cows 'n' Chaos",

              },
      title: `**${guildinfo[guildname][0]['guild_name']} Guild Information**`,
      fields: [
        {
          name: "**              Name                           Bonus**",
          value: `\`\`\`java
Sac. Exp      -  ${guildsheet[guildname][14]}
Pet Damage    -  ${guildsheet[guildname][15]}
Gold Rate     -  ${guildsheet[guildname][16]}
XP Rate       -  ${guildsheet[guildname][17]}
Wood Damage   -  ${guildsheet[guildname][18]}
Wood Yield    -  ${guildsheet[guildname][19]}
Stone Chance  -  ${guildsheet[guildname][20]}
Stone Yield   -  ${guildsheet[guildname][21]}
Fish Value    -  ${guildsheet[guildname][22]}
PetArena Dmg  -  ${guildsheet[guildname][23]}
Pet Training  -  ${guildsheet[guildname][24]}
Asc Points    -  ${guildsheet[guildname][25]}
Leg Points    -  ${guildsheet[guildname][26]}
Challenge Dmg -  ${guildsheet[guildname][27]}
ShipArena Dmg -  ${guildsheet[guildname][28]}
Beast Dmg     -  ${guildsheet[guildname][29]}
\`\`\``
        },
      ],

      footer: {
        icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
        text: `Last updated on ${month}月${day}日 ${hourstr3[0]}時${hourstr3[1]}分 JST(GMT+9)`

      }
    }
  }).catch(function (err) {
    console.error(err);
  });

}

});
}
