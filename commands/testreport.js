const Discord = require("discord.js");
const mongoose = require("mongoose");
const Report = require("../models/report.js");

var fs = require('fs');
var path = require('path');

exports.run = async (client, message, args) => {
  await message.delete();
  if (message.author.bot) return;
  mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
  let rUser = message.mentions.members.first();
  if(!rUser) return message.reply("Can't find that member.");
  let rreason = args.slice(1).join(" ");
  if(!rreason) return message.reply("Please supply a reason.");

  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: rUser.user.username,
    userID: rUser.Id,
    reason: rreason,
    rUsername: message.author.username,
    rID: message.author.id,
    time: message.createdAt
  });
  report.save()
  .then(result => console.log(result))
  .catch(err => console.log(err));

  message.reply("Report has been saved to the database");
}
