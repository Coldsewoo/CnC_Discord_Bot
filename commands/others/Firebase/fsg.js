const fs = require('fs');
const path = require('path');
const db = require(__basedir + '/coldsewooBOT.js')



exports.run = (client, message, args) => {
    db.collection('members_차새').where('roles', 'array-contains', 'Admin').get().then(docs => {
        docs.forEach(doc => {
            message.channel.send(doc.data().displayName)
        })
    }).catch(err => {
        console.log(err.message);
    })
};
