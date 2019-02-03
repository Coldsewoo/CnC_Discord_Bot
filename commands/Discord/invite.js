const queue = {};
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;
var autoinviteAOId = "540506186638688256";
var autoinviteCSId = "541602696986099742";
var autoinviteBRId = "541607984040640522";
var autoinviteTCId = "541608007981596673";


exports.run = (client, message, args) => {
    message.delete();
    // ignore auto-invite channel 
    if (message.channel.id == "540506186638688256") return; //AO
    if (message.channel.id == "541602696986099742") return; //CS
    if (message.channel.id == "541607984040640522") return; //BR
    if (message.channel.id == "541608007981596673") return; //TC

    // Works only in push-channels
    if (Global.inner_guild_pushes.indexOf(message.channel.id) == -1 && !Global.testChannels.includes(message.channel.id)) return;

    //for the test channels in my server (to be integrated with above line)
    var IGN = args[0];
    if (!IGN) return message.reply("your IGN?")

    if (!queue[message.channel.id] || queue[message.channel.id].queue == undefined) {
        queue[message.channel.id] = {
            queue: true
        }
        var timeout = 5000;


        // push message to the appropriate auto-invite channel
        if (message.channel.id == "511304632115527680") // AO 
        {
            var autoInviteChannel = client.channels.get(autoinviteAOId);
            autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);
        } else if (message.channel.id == "518820495878258710") // CS 
        {
            var autoInviteChannel = client.channels.get(autoinviteCSId);
            autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);
        } else if (message.channel.id == "491666791345684481") // BR 
        {
            var autoInviteChannel = client.channels.get(autoinviteBRId);
            autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);
        } else if (message.channel.id == "540685311987154944") // TC 
        {
            var autoInviteChannel = client.channels.get(autoinviteTCId);
            autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);
        } else {
            var autoInviteChannel = client.channels.get("508458634678763535");
            autoInviteChannel.send("!invite " + IGN + " " + message.member.displayName);
        }
        // var autoInviteChannelId = "540506186638688256";


        //inner timeout = 3sec , outer timeout = 5sec  total:8sec
        setTimeout(() => {
            autoInviteChannel.fetchMessages({ limit: 1 }).then(collected => {
                collected.forEach((msg) => {
                    message.channel.send("Invite sent on : " + IGN);
                    queue[message.channel.id].queue = undefined;
                    return false;
                })
            }).then(() => {
                setTimeout(() => {
                    message.channel.fetchMessages({ limit: 3 }).then(collected => {
                        collected.forEach(msg => {
                            if (msg.author.bot && msg.content.startsWith("Invite")) {
                                msg.delete();
                                queue[message.channel.id].queue = undefined;
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