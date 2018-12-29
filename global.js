const fs = require('fs');
const path = require('path');
var Guildinfo = [];
var IOU_guild = [];

var Global = {
	monthEng: ['XD', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	numArray: ['Zero', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'],
	leaderRole: ['BR Leadership', 'CS Leadership', 'The Collectives Leadership', 'Imaginarium Leadership', 'Fresh Air Leadership', 'Always Online Leadership', 'Admin'],
	adminRole: ['Admin'],
	guildColor: ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'],
	guildRole: ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'],
	guildnameList: [
		['br', 'burningrage', 'burning'],
		['cs', 'comingsoon', 'coming'],
		['tc', 'thecollectives', 'the'],
		['im', 'imaginarium', 'imag'],
		['fa', 'freshair', 'fresh'],
		['ao', 'alwaysonline', 'always']
	],
	adminId: '220499331344498688'
};


fs.readFileAsync = function(fileName) {
	return new Promise(function(resolve, reject) {
		try {
			fs.readFile(fileName, function(err, buffer) {
				if (err) reject(err);
				else resolve(buffer);
			});
		} catch (err) {
			reject(err);
		}
	});
};

function getJSONAsync(Name) {
	return fs.readFileAsync(path.join(__dirname, 'json', Name + '.json'));
}

const JSONnames = ['guildinfo', 'IOU_guild'].map(getJSONAsync);
Promise.all(JSONnames).then(function(JSONBuffers) {
	Guildinfo.push(JSON.parse(JSONBuffers[0]));
	IOU_guild.push(JSON.parse(JSONBuffers[1]));
})


module.exports = {
	Global: Global,
	Guildinfo: Guildinfo,
	IOU_guild: IOU_guild,
}