var path = require("path");
var fs = require("fs");
var numeral = require("numeral");
let guildsheet = [];
let IOU_guild = [];

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

  var JSONnames = ['guildsheet','IOU_guild','guildsheet'].map(getJSONAsync);
  Promise.all(JSONnames).then(function (JSONBuffers){
    guildinfo = JSON.parse(JSONBuffers[0]);
    IOU_guild = JSON.parse(JSONBuffers[1]);
    guildsheet = JSON.parse(JSONBuffers[2]);

    const guildname = args.shift().toLowerCase();
    if (guildname === 'br' || guildname === 'cs' || guildname === 'tc' || guildname === 'im'  || guildname === 'fa' || guildname === 'ao') {
  message.channel.send({embed: {
      color: `${guildinfo[guildname][0]['guild_color']}`,
      author: {
        name: "Cows 'n' Chaos",

              },
      title: `**${guildsheet[guildname][0]['guild_name']} guild information**`,
      fields: [
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Building    | Current |   Obj.  | Stone Req. |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Guild Level |   ${guildsheet[guildname][0][1]}   |    -    |      -     |
  |Wising Well |   ${guildsheet[guildname][0][2]}   |    -    |      -     |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Stable      |   ${guildsheet[guildname][0][3]}   |    -    |      -     |
  |Fortress    |   ${guildsheet[guildname][0][4]}   |    -    |      -     |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Bank        |   ${guildsheet[guildname][0][5]}   |    -    |      -     |
  |Sawmill     |   ${guildsheet[guildname][0][6]}   |    -    |      -     |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Sac Tower   |   ${guildsheet[guildname][0][7]}   |    -    |      -     |
  |Warehouse   |   ${guildsheet[guildname][0][8]}   |    -    |      -     |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Altar       |   ${guildsheet[guildname][0][9]}   |    -    |      -     |
  |Library     |   ${guildsheet[guildname][0][10]}   |    -    |      -     |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Aquatic     |   ${guildsheet[guildname][0][11]}   |    -    |      -     |
  |Space Aca.  |   ${guildsheet[guildname][0][12]}   |    -    |      -     |\`\`\``
        },
        {
          name: "+---------------------------------------------------------------------------------------+",
          value: `\`\`\`prolog
  |Guild Level |   ${guildsheet[guildname][0][13]}   |    -    |      -     |
  |Wising Well |   ${guildsheet[guildname][0][14]}   |    -    |      -     |\`\`\``
        },



      ],
      timestamp: Date(),
      footer: {
        icon_url:"https://cdn.discordapp.com/avatars/220499331344498688/28b6a51943316647b14adf1a3e84189f.png?size=128",
        text: "Last updated on "
      }
    }
  })
  } else
  message.channel.send(`You must type correct guild name (BR, CS, TC, IM, FA, AO)`);
  return;


  }).catch(function (err) {
    console.error(err);
  });

}
