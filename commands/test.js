const fs = require('fs');
const path = require('path');
const https = require('https');


exports.run = (client, message, args) => {
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
		return fs.readFileAsync(path.join(__dirname, '..', 'json', Name + '.json'));
	}

	const JSONnames = ['guildinfo', 'IOU_guild', 'guildsheet'].map(getJSONAsync);
	Promise.all(JSONnames).then(function(JSONBuffers) {
		const  guildinfo = JSON.parse(JSONBuffers[0]);
		const  IOU_guild = JSON.parse(JSONBuffers[1]);
		const  guildsheet = JSON.parse(JSONBuffers[2]);
		const brChannel = "<#491666791345684481>";
		const aoChannel = "<#511304632115527680>";
		const csChannel = "<#518820495878258710>";
		const textChannelforBR = "<#419088680670461972>";
		const coldsewoobotChannelforAO = "<#508458634678763535>";
		const musicbotChannelforCS = "<#508626305365835787>";

		console.log("id" + message.channel.id);
		console.log("none" + message.channel);
		if (message.channel == musicbotChannelforCS) {
			message.channel.send("CS!");
		} else
		if (message.channel == coldsewoobotChannelforAO) {
			message.channel.send("AO!");
		} else
		if (message.channel == textChannelforBR) {
			message.channel.send("BR!");
		} else return;
});
};
