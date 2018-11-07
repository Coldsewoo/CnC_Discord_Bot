var fs = require('fs');
var path = require('path');
var numeral = require("numeral");


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
    if (args[0] === 'help' || !args[0]) {
      message.reply({embed: {
          color: `${guildinfo[5][0]['guild_color']}`,
          author: {
            name: "Guildstone",
                  },
          title: `Calculates stone amount required for guild level`,
          fields: [
            {
              name: "Available Contents\n",
              value: `
              How to use : !guildstone from to

              ex) !guildstone 100 200 - stone req. from lv 100 to lv 200

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
    } else
    parseInt(args, 10);
    if (args[0] - args[1] > 0 || !args[0] || !args[1])
    {
      message.reply('Set the appropriate Range (from / to)');
      return;
    } else
    if (args[0] > 1000 || args[1] > 1000) {
      message.reply('Guild Level cannot be more than 1000');
      return;
    } else {
      var personal = IOU_guild['meta'][args[1]]['stone_sum']-IOU_guild['meta'][args[0]]['stone_sum'];
      var personal2 = numeral(personal).format('0a');
      var personal3 = personal2.toUpperCase();
      message.reply(personal3);
    }

});
}
