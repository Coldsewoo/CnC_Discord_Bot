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
		client.user.setActivity('Use ~help for more info XD', { type: 'PLAYING' });
		client.user.setUsername('CnC_Discord_BOT');
	});
};
