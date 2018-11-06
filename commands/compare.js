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
      message.reply(`You must type contents you want to compare (See !compare help)`);
      return;
    }
    var content = [];
    for(var i = 0; i<args.length; i++) {
      content.push(args[i].toLowerCase());
    }
    content.sort();
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

    if (content[0] === 'pet' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Pet related bonus comparison**`,
          fields: [
            {
              name: "Stable Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][4]}
   Coming Soon     -  ${guildsheet[1][4]}
   The Collectives -  ${guildsheet[2][4]}
   Imaginarium     -  ${guildsheet[3][4]}
   Fresh Air       -  ${guildsheet[4][4]}
   Always Online   -  ${guildsheet[5][4]}\`\`\``
            },
            {
              name: "Pet Damage",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][15]}
   Coming Soon     -  ${guildsheet[1][15]}
   The Collectives -  ${guildsheet[2][15]}
   Imaginarium     -  ${guildsheet[3][15]}
   Fresh Air       -  ${guildsheet[4][15]}
   Always Online   -  ${guildsheet[5][15]}\`\`\``
            },
            {
              name: "Pet Arena Damage",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][24]}
   Coming Soon     -  ${guildsheet[1][24]}
   The Collectives -  ${guildsheet[2][24]}
   Imaginarium     -  ${guildsheet[3][24]}
   Fresh Air       -  ${guildsheet[4][24]}
   Always Online   -  ${guildsheet[5][24]}\`\`\``
            },
            {
              name: "Pet Training",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][25]}
   Coming Soon     -  ${guildsheet[1][25]}
   The Collectives -  ${guildsheet[2][25]}
   Imaginarium     -  ${guildsheet[3][25]}
   Fresh Air       -  ${guildsheet[4][25]}
   Always Online   -  ${guildsheet[5][25]}\`\`\``
            },
            {
              name: "Beast Damage",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][30]}
   Coming Soon     -  ${guildsheet[1][30]}
   The Collectives -  ${guildsheet[2][30]}
   Imaginarium     -  ${guildsheet[3][30]}
   Fresh Air       -  ${guildsheet[4][30]}
   Always Online   -  ${guildsheet[5][30]}\`\`\``
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
    } else
    if (content[0] === 'gold' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Gold related bonus comparison**`,
          fields: [
            {
              name: "Bank Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][6]}
   Coming Soon     -  ${guildsheet[1][6]}
   The Collectives -  ${guildsheet[2][6]}
   Imaginarium     -  ${guildsheet[3][6]}
   Fresh Air       -  ${guildsheet[4][6]}
   Always Online   -  ${guildsheet[5][6]}\`\`\``
            },
            {
              name: "Gold Rate",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][16]}
   Coming Soon     -  ${guildsheet[1][16]}
   The Collectives -  ${guildsheet[2][16]}
   Imaginarium     -  ${guildsheet[3][16]}
   Fresh Air       -  ${guildsheet[4][16]}
   Always Online   -  ${guildsheet[5][16]}\`\`\``
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
    } else

    if (content[0] === 'exp' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**XP related bonus comparison**`,
          fields: [
            {
              name: "Altar Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][10]}
   Coming Soon     -  ${guildsheet[1][10]}
   The Collectives -  ${guildsheet[2][10]}
   Imaginarium     -  ${guildsheet[3][10]}
   Fresh Air       -  ${guildsheet[4][10]}
   Always Online   -  ${guildsheet[5][10]}\`\`\``
            },
            {
              name: "XP Rate",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][17]}
   Coming Soon     -  ${guildsheet[1][17]}
   The Collectives -  ${guildsheet[2][17]}
   Imaginarium     -  ${guildsheet[3][17]}
   Fresh Air       -  ${guildsheet[4][17]}
   Always Online   -  ${guildsheet[5][17]}\`\`\``
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
    } else

    if (content[0] === 'wood' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Wood related bonus comparison**`,
          fields: [
            {
              name: "Sawmill Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][7]}
   Coming Soon     -  ${guildsheet[1][7]}
   The Collectives -  ${guildsheet[2][7]}
   Imaginarium     -  ${guildsheet[3][7]}
   Fresh Air       -  ${guildsheet[4][7]}
   Always Online   -  ${guildsheet[5][7]}\`\`\``
            },
            {
              name: "Woodcutting Damage",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][18]}
   Coming Soon     -  ${guildsheet[1][18]}
   The Collectives -  ${guildsheet[2][18]}
   Imaginarium     -  ${guildsheet[3][18]}
   Fresh Air       -  ${guildsheet[4][18]}
   Always Online   -  ${guildsheet[5][18]}\`\`\``
            },
            {
              name: "Woodcutting Yield",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][19]}
   Coming Soon     -  ${guildsheet[1][19]}
   The Collectives -  ${guildsheet[2][19]}
   Imaginarium     -  ${guildsheet[3][19]}
   Fresh Air       -  ${guildsheet[4][19]}
   Always Online   -  ${guildsheet[5][19]}\`\`\``
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
    } else

    if (content[0] === 'stone' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Stone related bonus comparison**`,
          fields: [
            {
              name: "Warehouse Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][9]}
   Coming Soon     -  ${guildsheet[1][9]}
   The Collectives -  ${guildsheet[2][9]}
   Imaginarium     -  ${guildsheet[3][9]}
   Fresh Air       -  ${guildsheet[4][9]}
   Always Online   -  ${guildsheet[5][9]}\`\`\``
            },
            {
              name: "+1 Stone Drop Chance",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][20]}
   Coming Soon     -  ${guildsheet[1][20]}
   The Collectives -  ${guildsheet[2][20]}
   Imaginarium     -  ${guildsheet[3][20]}
   Fresh Air       -  ${guildsheet[4][20]}
   Always Online   -  ${guildsheet[5][20]}\`\`\``
            },
            {
              name: "Stone Yield",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][21]}
   Coming Soon     -  ${guildsheet[1][21]}
   The Collectives -  ${guildsheet[2][21]}
   Imaginarium     -  ${guildsheet[3][21]}
   Fresh Air       -  ${guildsheet[4][21]}
   Always Online   -  ${guildsheet[5][21]}\`\`\``
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
    } else

    if (content[0] === 'points' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Points related bonus comparison**`,
          fields: [
            {
              name: "Fortress Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][5]}
   Coming Soon     -  ${guildsheet[1][5]}
   The Collectives -  ${guildsheet[2][5]}
   Imaginarium     -  ${guildsheet[3][5]}
   Fresh Air       -  ${guildsheet[4][5]}
   Always Online   -  ${guildsheet[5][5]}\`\`\``
            },
            {
              name: "Asc Points",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][26]}
   Coming Soon     -  ${guildsheet[1][26]}
   The Collectives -  ${guildsheet[2][26]}
   Imaginarium     -  ${guildsheet[3][26]}
   Fresh Air       -  ${guildsheet[4][26]}
   Always Online   -  ${guildsheet[5][26]}\`\`\``
 },
            {
              name: "Legendary Points",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][27]}
   Coming Soon     -  ${guildsheet[1][27]}
   The Collectives -  ${guildsheet[2][27]}
   Imaginarium     -  ${guildsheet[3][27]}
   Fresh Air       -  ${guildsheet[4][27]}
   Always Online   -  ${guildsheet[5][27]}\`\`\``
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
    } else

    if (content[0] === 'sac' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Sacrifical Offering related bonus comparison**`,
          fields: [
            {
              name: "Sacrifical Tower Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][8]}
   Coming Soon     -  ${guildsheet[1][8]}
   The Collectives -  ${guildsheet[2][8]}
   Imaginarium     -  ${guildsheet[3][8]}
   Fresh Air       -  ${guildsheet[4][8]}
   Always Online   -  ${guildsheet[5][8]}\`\`\``
            },
            {
              name: "Sacrifical Offering XP",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][14]}
   Coming Soon     -  ${guildsheet[1][14]}
   The Collectives -  ${guildsheet[2][14]}
   Imaginarium     -  ${guildsheet[3][14]}
   Fresh Air       -  ${guildsheet[4][14]}
   Always Online   -  ${guildsheet[5][14]}\`\`\``
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
    } else

    if (content[0] === 'fish' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Fish related bonus comparison**`,
          fields: [
            {
              name: "Aquatic Research Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][12]}
   Coming Soon     -  ${guildsheet[1][12]}
   The Collectives -  ${guildsheet[2][12]}
   Imaginarium     -  ${guildsheet[3][12]}
   Fresh Air       -  ${guildsheet[4][12]}
   Always Online   -  ${guildsheet[5][12]}\`\`\``
            },
            {
              name: "Fish Value",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][22]}
   Coming Soon     -  ${guildsheet[1][22]}
   The Collectives -  ${guildsheet[2][22]}
   Imaginarium     -  ${guildsheet[3][22]}
   Fresh Air       -  ${guildsheet[4][22]}
   Always Online   -  ${guildsheet[5][22]}\`\`\``
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
    } else

    if (content[0] === 'cards' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Cards related bonus comparison**`,
          fields: [
            {
              name: "Library Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][11]}
   Coming Soon     -  ${guildsheet[1][11]}
   The Collectives -  ${guildsheet[2][11]}
   Imaginarium     -  ${guildsheet[3][11]}
   Fresh Air       -  ${guildsheet[4][11]}
   Always Online   -  ${guildsheet[5][11]}\`\`\``
            },
            {
              name: "Card Drop Amount",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][23]}
   Coming Soon     -  ${guildsheet[1][23]}
   The Collectives -  ${guildsheet[2][23]}
   Imaginarium     -  ${guildsheet[3][23]}
   Fresh Air       -  ${guildsheet[4][23]}
   Always Online   -  ${guildsheet[5][23]}\`\`\``
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
    } else
    if (content[0] === 'challenge' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Challenge related bonus comparison**`,
          fields: [
            {
              name: "Challenge Damage",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][28]}
   Coming Soon     -  ${guildsheet[1][28]}
   The Collectives -  ${guildsheet[2][28]}
   Imaginarium     -  ${guildsheet[3][28]}
   Fresh Air       -  ${guildsheet[4][28]}
   Always Online   -  ${guildsheet[5][28]}\`\`\``
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
    } else
    if (content[0] === 'space' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Space Arena related bonus comparison**`,
          fields: [
            {
              name: "Space Academy Level",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][13]}
   Coming Soon     -  ${guildsheet[1][13]}
   The Collectives -  ${guildsheet[2][13]}
   Imaginarium     -  ${guildsheet[3][13]}
   Fresh Air       -  ${guildsheet[4][13]}
   Always Online   -  ${guildsheet[5][13]}\`\`\``
            },
            {
              name: "Ship Arena HP/Damage",
              value: `\`\`\`prolog
   Burning Rage    -  ${guildsheet[0][29]}
   Coming Soon     -  ${guildsheet[1][29]}
   The Collectives -  ${guildsheet[2][29]}
   Imaginarium     -  ${guildsheet[3][29]}
   Fresh Air       -  ${guildsheet[4][29]}
   Always Online   -  ${guildsheet[5][29]}\`\`\``
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
    } else
    if (content[0] === 'help' ) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Cows 'n' Chaos",

                  },
          title: `**Compare**`,
          fields: [
            {
              name: "Available Contents\n",
              value: `\n\r

***Pet*** - Stable Level, PetDmg, Pet Arena Dmg, Pet Training, Beast Damage

***Gold*** - Bank Level, Gold Rate

***Exp*** - Altar Level, EXP Rate

***Wood*** - Sawmill Level, Woodcutting Dmg, Woodcutting Yield

***Stone*** - Warehouse Level, +1 Stone Chance, Stone Yield

***Points*** - Fortress Level, Asc Points, Legendary Points

***Sac*** - Sacrifical Tower Level, Sacrifical Offering EXP

***Fish*** - Aquatic Research Level, Fish Value

***Cards*** - Library Level, Card Drop Amount

***Challenge*** - Challenge Damage

***Space*** - Space Academy Level, Space Arena HP/Damage

\n\r
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
    message.reply(`You must type correct content name you want to compare (See !compare help)`);
    return;

});
}