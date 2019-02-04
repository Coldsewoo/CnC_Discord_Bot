const fs = require('fs');
const path = require('path');
var Guildinfo = [];
var IOU_guild = [];

var Global = {
	monthEng: ['XD', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	numArray: ['Zero', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'],
	leaderRole: ['BR Leadership', 'CS Leadership', 'The Collectives Leadership', 'Imaginarium Leadership', 'Fresh Air Leadership', 'Always Online Leadership', 'Admin'],
	adminRole: ['Admin'],
	guildColor: ['14713377', '7382744', '951659', '9984690', '3407751', '16398164', '16312092'], //BR, CS, TC, IM, FA, AO, else
	guildRole: ['BR', 'CS', 'The Collectives', 'Imaginarium', 'Fresh Air', 'Always Online'],
	guildnameList: [
		['br', 'burningrage', 'burning'],
		['cs', 'comingsoon', 'coming'],
		['tc', 'thecollectives', 'the'],
		['im', 'imaginarium', 'imag'],
		['fa', 'freshair', 'fresh'],
		['ao', 'alwaysonline', 'always']
	],
	guildnameAbbr: [
		'BR', 'CS', 'TC', 'IM', 'FA', 'AO'
	],
	adminId: '220499331344498688',
	cnc_opened: ['512731044969971723',
		'454677039858057216',
		'523204509925769251',
		'453517489561665536',
		'484824438244900875',
		'453517636572151840',
		'453516377962053634',
		'492663364703748096',
		'476351083921276938',
		'453517764846419969',
		'460101673998745600',
		'455088374122807336',
		'455087817635266571'
	],
	cnc_spam: ['519108917796667392'],
	inner_guild_pushes: ['518820495878258710', '511304632115527680', '491666791345684481'],
	testChannels: ['419088680670461972', '420617424929423370', '508458634678763535', '508626305365835787', '510090900236533769', '511871369273933835', '512766335994953728', '514016888037048341'],
	root: root
};


var readFileAsync = function (fileName) {
	return new Promise(function (resolve, reject) {
		try {
			fs.readFile(fileName, function (err, buffer) {
				if (err) reject(err);
				else resolve(buffer);
			});
		} catch (err) {
			reject(err);
		}
	});
};

function getJSONAsync(Name) {
	return readFileAsync(path.join(__dirname, 'json', Name + '.json'));
}

const JSONnames = ['guildinfo', 'IOU_guild'].map(getJSONAsync);
Promise.all(JSONnames).then(function (JSONBuffers) {
	Guildinfo.push(JSON.parse(JSONBuffers[0]));
	IOU_guild.push(JSON.parse(JSONBuffers[1]));
})


module.exports = {
	Global: Global,
	Guildinfo: Guildinfo,
	IOU_guild: IOU_guild,
}