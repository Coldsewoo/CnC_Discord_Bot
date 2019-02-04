const fs = require('fs');
const path = require('path');

exports.run = (client, message, args) => {
  var guildinfo = [];
  var IOU_guild = [];

  fs.readFileAsync = function(fileName) {
    return new Promise(function(resolve, reject) {
      try {
        fs.readFile(fileName, function(err, buffer) {
          if (err) reject(err); else resolve(buffer);
        });
      }
      catch (err) {
        reject(err);
      }
    });
  };

  function getJSONAsync(Name) {
    return fs.readFileAsync(path.join(__dirname,'..','json', Name + '.json'));
  }

  const JSONnames = ['guildinfo', 'IOU_guild'].map(getJSONAsync);
  Promise.all(JSONnames).then(function(JSONBuffers) {
    guildinfo = JSON.parse(JSONBuffers[0]);
    IOU_guild = JSON.parse(JSONBuffers[1]);
    return {
        guildinfo: guildinfo,
        IOU_guild: IOU_guild
    };
  }).then(function(guildinfo, IOU_guild) {
  console.log(guildinfo);
  //console.log(IOU_guild);
  })
}
