exports.run = (client, message, args) => {
  var guildcolor;
  if(message.member.roles.find(role => role.name === "BR"))
  {
  guildcolor = "14713377";
  } else
  if(message.member.roles.find(role => role.name === "CS"))
  {
  guildcolor = "7382744";
  } else
  if(message.member.roles.find(role => role.name === "The Collectives"))
  {
  guildcolor = "951659";
  } else
  if(message.member.roles.find(role => role.name === "Imaginarium"))
  {
  guildcolor = "9984690";
  } else
  if(message.member.roles.find(role => role.name === "Fresh Air"))
  {
  guildcolor = "3407751";
  } else
  if(message.member.roles.find(role => role.name === "Always Online"))
  {
  guildcolor = "16398164";
  } else
  {
  guildcolor = "16312092";
  }
  message.reply({embed: {
      color: guildcolor,
      author: {
        name: "Cows 'n' Chaos",

              },
      title: `**Help**`,
      fields: [
        {
          name: "Available Commands",
          value: `
          **Info : Guild Level info**
          *See !info help*
          **Bonus : Guild Bonus **
          *See !Bonus help*
          **Compare : Compare level & bonus information on each guild**
                          *See !Compare help*
          **Personal : Calculate stone required for guild personal from and to**
                           *See !Personal help*
          **Guildstone : Calculate stone required for guild level from and to**
                             *See !Guildstone help*
          **Update : Update guild information**
          *Updated Information is from CnC Guild's Utility Sheet*
          **Guides : Useful Sheets & Guides on IOU**
          **Clear : Clear : Delete the latest 30 bot request and responses**
          *Only Administrators can use !Clear command*
          **Cat : Random cat XD**
          **Puppy : Random puppy XDXD**

          **Contact me if you have any question or suggestion!
          https://github.com/Coldsewoo/CnC_Discord_Bot**\n\n\n
          `
        }
      ],

      footer: {
        icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
        text: `IOU_BOT made by Coldsewoo (차가운새우#2410)`

      }
    }
  }).catch(function (err) {
    console.error(err);
  });
}
