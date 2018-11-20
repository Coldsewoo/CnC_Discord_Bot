const { get } = require('snekfetch');
const Discord = require('discord.js');


exports.run = (client, message, args) => {

  	try {
  			get('https://dog.ceo/api/breeds/image/random').then(res => {
          const image = JSON.parse(res.text);
          const embed = new Discord.RichEmbed()
  				.setImage(image.message);
  			     return message.channel.send({ embed });

  			});
  		}
	catch(err) {
  			return message.channel.send(err.stack);
  		}
  	};
