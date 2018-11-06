exports.run = (client, message, args) => {
  message.reply({embed: {
      color: 1397735,
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
