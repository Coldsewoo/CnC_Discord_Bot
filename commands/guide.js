exports.run = (client, message, args) => {
  message.reply({embed: {
      color: 1397735,
      author: {
        name: "Idle Online Universe",

              },
      title: `**Useful Sheets & Guides**`,
      fields: [
        {
          name: "IOU Complete Multicalc",
          value: `
          [Link to URL](https://docs.google.com/spreadsheets/d/1QGBm6KtcOZraqSkLWVuqTF16vUD7rrOvIpdh59bFLmg/edit)
          `
        },
        {
          name: "CnC Guild's Mining Depth",
          value: `
          [Link to URL](https://docs.google.com/spreadsheets/d/1RW-alTry7R5sQ4WM7CfMDwItpXO9pYtBvy40IatCKpo/edit#gid=1654182966)
          `
        },
        {
          name: "CnC Looking for Party Sheet",
          value: `
          [Link to URL](https://docs.google.com/spreadsheets/d/1GB3bMxn1KzJIvfNjMfBTOb3ouK49OGAFV00eVho2xXs/edit?usp=sharing)
          `
        },
        {
          name: "IOU Starter Guide",
          value: `
          [Link to URL](https://tinyurl.com/IOUguide)
          `
        },
        {
          name: "BRIEF GUIDE for WOOD BUILD, STONE and SHIP PUSHES",
          value: `
          [Link to URL](https://docs.google.com/document/d/1zQkz1wq7RsJEKE_8CFQ4-tJW0sUdAs-uekbXIC6H6A0/edit?usp=sharing)
          `
        },
        {
          name: "IOU Wiki",
          value: `
          [Link to URL](http://iourpg.wikia.com/wiki/Idle_Online_Universe_Wiki)
          `
        },
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