const db = require(__basedir + '/coldsewooBOT.js');
const buildings = db.collection('buildings');
const globalVar = require(__basedir + '/globalVar.js')
const Global = globalVar.Global;

exports.run = (client, message, args) => {
    var gBuilding = {};
    buildings.get().then(async docs => {
        await docs.forEach(doc => {
            gBuilding[doc.id] = doc.data();
        })
        const messageTime = new Date().getTime() / 1000;
        const storedTime = gBuilding["timeinfo"]["timestamp"]
        const timeDiff = Math.abs(messageTime - storedTime)
        return Promise.resolve(timeDiff);
    }).then((timeDiff) => {
        if (timeDiff > 3600 * 24 * 1000) return message.reply("Please ~update")
        if (Global.cnc_opened.indexOf(message.channel.id) > -1) {
            if (Global.testChannels.indexOf(message.channel.id) == -1) {
                message.delete();
                message.reply("You cannot use this command in this channel")
                setTimeout(() => {
                    message.channel.fetchMessages({
                        limit: 3
                    }).then(collected => {
                        collected.forEach(msg => {
                            if (msg.author.bot) msg.delete();
                        });
                    });
                }, 3000);
                return;
            }
        }
        if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.channel.send('You are not CnC member!');
        let color;
        for (let i = 0; i < 6; i++) {
            if (message.member.roles.find(role => role.name === Global.guildRole[i])) {
                color = Global.guildColor[i];
            }
        }
        if (!color) color = Global.guildColor[6];


        if (!args[0]) {
            message.channel.send({
                embed: {
                    color: `${color}`,
                    author: {
                        name: 'Bonus',

                    },
                    title: 'Shows Guild Bonus (except for personal guild bonus)',
                    fields: [{
                        name: 'Available Contents (use ~ before the desired command)\n',
                        value: `
**Burning Rage** - *BR, Burningrage*
**Coming Soon** - *CS, Comingsoon*
**The Collectives** - *TC, Thecollectives*
**Imaginarium** - *IM, Imaginarium*
**Fresh Air** - *FA, Freshair*
**Always Online** - *AO, Alwaysonline*
ex) ~bonus AO, ~bonus Alwaysonline
    `,
                    },],

                    footer: {
                        icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
                        text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

                    },
                },
            }).catch(function (err) {
                console.error(err);
            });
            return;
        }

        const guildnameInput = args.slice().shift().toLowerCase();
        let guildname;
        for (let i = 0; i < 6; i++) {
            if (Global.guildnameList[i].indexOf(guildnameInput) >= 0) {
                guildname = Global.guildnameAbbr[i];
            }
        }
        if (!guildname) {
            if (guildnameInput === 'help') {
                return message.channel.send({
                    embed: {
                        color: `${color}`,
                        author: {
                            name: 'Bonus',

                        },
                        title: 'Shows Guild Bonus (except for personal guild bonus)',
                        fields: [{
                            name: 'Available Contents (use ~ before the desired command)\n',
                            value: `
    **Burning Rage** - *BR, Burningrage*
    **Coming Soon** - *CS, Comingsoon*
    **The Collectives** - *TC, Thecollectives*
    **Imaginarium** - *IM, Imaginarium*
    **Fresh Air** - *FA, Freshair*
    **Always Online** - *AO, Alwaysonline*
    ex) ~bonus AO, ~bonus Alwaysonline
        `,
                        },],

                        footer: {
                            icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
                            text: '\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)',

                        },
                    },
                }).catch(function (err) {
                    console.error(err);
                });
            } else {
                message.channel.send('You must type correct guild name (See ~bonus help)');
                return;
            }
        }


        message.channel.send({
            embed: {
                color: `${gBuilding[guildname]["color"]}`,
                author: {
                    name: 'Cows \'n\' Chaos',

                },
                title: `**${gBuilding[guildname]['guildName']} Guild Information**`,
                fields: [{
                    name: '**              Name                           Bonus**',
                    value: `\`\`\`prolog
Sac. Exp      -  ${gBuilding[guildname]["SacEXP"]}
Pet Damage    -  ${gBuilding[guildname]["PetDmg"]}
Gold Rate     -  ${gBuilding[guildname]["Gold"]}
XP Rate       -  ${gBuilding[guildname]["EXP"]}
Wood Damage   -  ${gBuilding[guildname]["WoodDmg"]}
Wood Yield    -  ${gBuilding[guildname]["WoodYield"]}
Stone Chance  -  ${gBuilding[guildname]["StoneChance"]}
Stone Yield   -  ${gBuilding[guildname]["StoneYield"]}
Fish Value    -  ${gBuilding[guildname]["FishValue"]}
Card Value    -  ${gBuilding[guildname]["CardDrop"]}
PetArena Dmg  -  ${gBuilding[guildname]["PetArenaDmg"]}
Pet Training  -  ${gBuilding[guildname]["PetTraning"]}
Asc Points    -  ${gBuilding[guildname]["AscPoints"]}
Leg Points    -  ${gBuilding[guildname]["LegPoints"]}
Challenge Dmg -  ${gBuilding[guildname]["ChallengeDmg"]}
ShipArena Dmg -  ${gBuilding[guildname]["ShipArenaDmg"]}
Beast Dmg     -  ${gBuilding[guildname]["BeastDmg"]}
\`\`\``,
                },],

                footer: {
                    icon_url: 'https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png',
                    text: `Last updated on ${Global.monthEng[gBuilding["timeinfo"]["months"]]} ${gBuilding["timeinfo"]["days"]} ${gBuilding["timeinfo"]["years"]}, ${gBuilding["timeinfo"]["hour"]}:${gBuilding["timeinfo"]["mins"]} JST(GMT+9)`,

                },
            },
        }).catch(function (err) {
            console.error(err);
        });
    })
}
