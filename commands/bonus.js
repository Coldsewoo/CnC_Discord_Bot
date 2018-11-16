var fs = require('fs');
var path = require('path');
var obj;
var monthEng = ["XD", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
      message.channel.send({embed: {
          color: `${guildcolor}`,
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
ex) ~bonus AO, ~bonus Alwaysonline
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
ex) ~bonus AO, ~bonus Alwaysonline
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
      message.channel.send(`You must type correct guild name (See ~bonus help)`);
      return;
    }

if (guildname === 'help')
{
  return;
} else
{
  if(!guildsheet[8]) {
    message.reply(" *Please* **~update** *first*");
    return;
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
          value: `\`\`\`prolog
Sac. Exp      -  ${guildsheet[guildname][14]}
Pet Damage    -  ${guildsheet[guildname][15]}
Gold Rate     -  ${guildsheet[guildname][16]}
XP Rate       -  ${guildsheet[guildname][17]}
Wood Damage   -  ${guildsheet[guildname][18]}
Wood Yield    -  ${guildsheet[guildname][19]}
Stone Chance  -  ${guildsheet[guildname][20]}
Stone Yield   -  ${guildsheet[guildname][21]}
Fish Value    -  ${guildsheet[guildname][22]}
Card Value    -  ${guildsheet[guildname][23]}
PetArena Dmg  -  ${guildsheet[guildname][24]}
Pet Training  -  ${guildsheet[guildname][25]}
Asc Points    -  ${guildsheet[guildname][26]}
Leg Points    -  ${guildsheet[guildname][27]}
Challenge Dmg -  ${guildsheet[guildname][28]}
ShipArena Dmg -  ${guildsheet[guildname][29]}
Beast Dmg     -  ${guildsheet[guildname][30]}
\`\`\``
        },
      ],

      footer: {
        icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
        text: `Last updated on ${monthEng[guildsheet[8][1]]} ${guildsheet[8][2]}, ${guildsheet[8][3]}:${guildsheet[8][4]} JST(GMT+9)`

      }
    }
  }).catch(function (err) {
    console.error(err);
  });

}

});
}
