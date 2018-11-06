const { get } = require("snekfetch");
const Discord = require("discord.js");
let lastCallDate, lastCallUser;
const client = new Discord.Client();


exports.run = (client, message, args) => {

  	try {
  			get('https://dog.ceo/api/breeds/image/random').then(res => {
  				const embed = new Discord.RichEmbed()
  				.setImage(res.body.message)
  				return message.channel.send({embed});

  			});
  		} catch(err) {
  			return message.channel.send(error.stack);
  		}
  	}
