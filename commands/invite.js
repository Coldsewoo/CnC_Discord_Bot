const queue = {};
const global = require('../global.js');
const Global = global.Global;

exports.run = (client, message, args) => {
    message.delete();
    if (message.channel.id == "540506186638688256") return;
    //if (message.channel.id != "511304632115527680") return;
    if (!Global.testChannels.includes(message.channel.id)) return;

    if (!queue[queue] || queue[queue].queue == undefined) {
        queue[queue] = {
            queue: true
        }
        var timeout = 5000;
        var IGN = args[0];
        const autoInviteChannelId = "540506186638688256";
        const autoInviteChannel = client.channels.get(autoInviteChannelId);
        autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);

        setTimeout(() => {
            autoInviteChannel.fetchMessages({ limit: 1 }).then(collected => {
                collected.forEach((msg) => {
                    message.channel.send("Invite sent on : " + IGN);
                    queue[queue].queue = undefined;
                    return false;
                })
            }).then(() => {
                setTimeout(() => {
                    message.channel.fetchMessages({ limit: 3 }).then(collected => {
                        collected.forEach(msg => {
                            if (msg.author.bot && msg.content.startsWith("Invite")) {
                                msg.delete();
                                queue[queue].queue = undefined;
                            }
                        })
                    }).then(() => {
                        message.channel.fetchMessages({ limit: 3 }).then(collected => {
                            collected.forEach(msg => {
                                if (msg.author.bot && msg.content.indexOf("pls") > 0) {
                                    msg.delete();
                                }
                            })
                        })
                    })
                }, 3000);
            })
                .catch(err => {
                    message.reply("error! pls do it once again")
                })
        }, timeout);
    } else {
        console.log(queue[queue]);
        return message.reply("pls wait!")

    }
}