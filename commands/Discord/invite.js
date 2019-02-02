const queue = {};
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;

exports.run = (client, message, args) => {
    message.delete();
    // ignore auto-invite channel 
    if (message.channel.id == "540506186638688256") return;

    // Works only in the ao-push-channel
    if (message.channel.id != "511304632115527680" && !Global.testChannels.includes(message.channel.id)) return;

    //for the test channels in my server (to be integrated with above line)
    var IGN = args[0];
    if (!IGN) return message.reply("your IGN?")

    if (!queue[queue] || queue[queue].queue == undefined) {
        queue[queue] = {
            queue: true
        }
        var timeout = 5000;


        // push message to the auto-invite channel
        const autoInviteChannelId = "540506186638688256";
        const autoInviteChannel = client.channels.get(autoInviteChannelId);
        autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);


        //inner timeout = 3sec , outer timeout = 5sec  total:8sec
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
        return message.reply("pls wait!")
    }
}