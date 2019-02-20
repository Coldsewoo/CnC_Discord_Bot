const fs = require('fs');
const path = require('path');
const db = require(__basedir + '/coldsewooBOT.js')
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;


exports.run = (client, message, args) => {

    message.guild.members.forEach(async member => {
        var id = member.id;
        var roles = [];
        await member.roles.forEach(role => {
            roles.push(role.name);
        })
        var displayName = member.displayName;
        db.collection('members_CnC').set({
            roles: roles,
            memberId: id,
            displayName: displayName,
            exp: 0,
            time: 0,
            level: 0,
            IGN: "IGN?"
        }, { merge: true }).then((ref) => {
            console.log(ref.id)
        }).catch(err => {
            console.log(err.message);
        })
    })

};
