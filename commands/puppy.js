const { get } = require("snekfetch");
const Discord = require("discord.js");
let lastCallDate, lastCallUser;
const client = new Discord.Client();


exports.run = (client, message, args) => {

  	try {
  			get('https://random.dog/woof.json').then(res => {
  				const embed = new Discord.RichEmbed()
  				.setImage(res.body.url)
  				return message.channel.send({embed});

  			});
  		} catch(err) {
  			return message.channel.send(error.stack);
  		}
  	}
