exports.run = (client, message, args) => {
    if (!queue) {
        var queue = true;
    } else if (queue == true) {
        return message.reply("pls wait!")
    }
    var timeout = 5000;
    var IGN = args[0];
    const autoInviteChannelId = "540506186638688256";
    const autoInviteChannel = client.channels.get(autoInviteChannelId);
    autoInviteChannel.send("!invite " + IGN);

    setTimeout(() => {
        autoInviteChannel.fetchMessage({ limit: 5 }).then(collected => {
            collected.forEach((msg) => {
                if (msg.author.id == "499224352697614355" && msg.includes(IGN)) {
                    message.reply("Invite sent on : " + IGN);
                    queue = undefined;
                }
            })
        })
    }, timeout);
}