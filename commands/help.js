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
          *Updated Information is from CnC Guild's Mining Depth Sheet*
          **Guides : Useful Sheets & Guides on IOU**
          **Cat : Random cat XD**
          **Puppy : Random puppy XDXD**

          ***Contact me if you have any question or suggestion!***\n\n\n
          `
        }
      ],

      footer: {
        icon_url:"https://cdn.discordapp.com/avatars/220499331344498688/28b6a51943316647b14adf1a3e84189f.png?size=128",
        text: `IOU_BOT made by Coldsewoo (차가운새우#2410)`

      }
    }
  }).catch(function (err) {
    console.error(err);
  });
}
