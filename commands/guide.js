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
    message.reply({embed: {
        color: 1397735,
        author: {
          name: "Idle Online Universe",

                },
        title: `**Useful Sheets & Guides**`,
        fields: [
          {
            name: "IOU Complete Multicalc",
            value: `
            [Link to URL](https://docs.google.com/spreadsheets/d/1QGBm6KtcOZraqSkLWVuqTF16vUD7rrOvIpdh59bFLmg/edit) - Current Version : ${guildsheet[7][1]}
            `
          },
          {
            name: "CnC Guild's Utility Sheet",
            value: `
            [Link to URL](https://docs.google.com/spreadsheets/d/1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo/edit#gid=1654182966)
            `
          },
          {
            name: "CnC Looking for Party Sheet",
            value: `
            [Link to URL](https://docs.google.com/spreadsheets/d/1GB3bMxn1KzJIvfNjMfBTOb3ouK49OGAFV00eVho2xXs/edit?usp=sharing)
            `
          },
          {
            name: "IOU Starter Guide",
            value: `
            [Link to URL](https://tinyurl.com/IOUguide)
            `
          },
          {
            name: "BRIEF GUIDE for WOOD BUILD, STONE and SHIP PUSHES",
            value: `
            [Link to URL](https://docs.google.com/document/d/1zQkz1wq7RsJEKE_8CFQ4-tJW0sUdAs-uekbXIC6H6A0/edit?usp=sharing)
            `
          },
          {
            name: "IOU Wiki",
            value: `
            [Link to URL](http://iourpg.wikia.com/wiki/Idle_Online_Universe_Wiki)
            `
          },
        ],

        footer: {
          icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
          text: `IOU_BOT made by Coldsewoo (차가운새우#2410)`

        }
      }
    }).catch(function (err) {
      console.error(err);
    });
  });


}
