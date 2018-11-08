
exports.run = (client, message, args) => {
  var clientDate = new Date();
  var timezone = new Date(clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000));
  var timezone2 = new Date(clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000) + 32400000);
  var timezoneoffset = new Date(clientDate.getTimezoneOffset());
  message.channel.send(`${clientDate} clientDate`);
  message.channel.send(`${timezoneoffset*60000} timezoneoffset*60000`);
  message.channel.send(`${timezone} timezone`);
  message.channel.send(`${timezone2} timezone2`);

  var dates = [
    timezone.getFullYear(),
    parseInt(timezone.getMonth())+1,
    timezone.getDate(),
    timezone.getHours(),
    timezone.getMinutes()
  ];
  var dates2 = [
    timezone2.getFullYear(),
    parseInt(timezone2.getMonth())+1,
    timezone2.getDate(),
    timezone2.getHours(),
    timezone2.getMinutes()
  ]

  message.channel.send(`${dates[0]}/${dates[1]}/${dates[2]}/${dates[3]}/${dates[4]} timezone`);
  message.channel.send(`${dates2[0]}/${dates2[1]}/${dates2[2]}/${dates2[3]}/${dates2[4]} timezone2`);
}
