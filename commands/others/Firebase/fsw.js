const fs = require('fs');
const path = require('path');

const db = require(__basedir + '/coldsewooBOT.js')



exports.run = (client, message, args) => {

    message.guild.members.forEach(member => {
        var id = member.id;
        var roles = [];
        member.roles.forEach(role => {
            roles.push(role.name);
        })
        var displayName = member.displayName;
        db.collection('members_차새').add({
            roles: roles,
            memberId: id,
            displayName: displayName,
            exp: 0,
            time: 0,
            level: 0
        }).then((ref) => {
            console.log(ref.id)
        }).catch(err => {
            console.log(err.message);
        })
    })

};
