const fs = require('fs');
const path = require('path');
const https = require('https');
var global = require('../global.js');
var Global = global.Global;
var guildinfo = global.Guildinfo;
var IOU_guild = global.IOU_guild;
const {
    get
} = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client()
const db = require('../coldsewoobot')



exports.run = (client, message, args) => {


    db.collection('members_차새').where('roles', 'array-contains', 'Admin').get().then(docs => {
        docs.forEach(doc => {
            message.channel.send(doc.data().displayName)
        })
    }).catch(err => {
        console.log(err.message);
    })
};
