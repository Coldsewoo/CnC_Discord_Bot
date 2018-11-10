var fs = require('fs');
var path = require('path');
var guilds = {};

exports.run = (client, message, args) => {

  const member = message.member.id;
  const mess = message.content.toLowerCase();
  const content = message.content.split(' ').slice(2).join(" ");
  const member_Id = message.member.user.tag;
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

  if(!guilds[message.channel.id]) {
    guilds[message.channel.id] = {
      queue: [],
      queueContent: [],
      queueId: [],
      isIn: false,
      maxIn: [1]
    };
}


  if(args[0] === 'add') {
    add_to_queue(member, member_Id, content);
    message.reply('Added to Queue number:  ' + "**" + guilds[message.channel.id].queueContent.length + "**");
  } else
  if(args[0] === 'delete' || args[0] === 'remove') {
    if(message.member.roles.find(role => role.name === "Admin"))
    {
      const deleteNum = message.content.split(' ').slice(2).join(" ");
      parseInt(deleteNum, 10);
      queue_delete(member, deleteNum, message);
    } else
    {
      message.reply("You do not have a permission to delete queue");
    }

  } else
  if(args[0] === 'insert') {
    queue_insert(member, member_Id, message);
  } else
  if(args[0] === 'help') {
    message.reply({embed: {
        color: `${guildcolor}`,
        author: {
          name: "Cows 'n' Chaos",

                },
        title: `**Queue**`,
        fields: [
          {
            name: "Available Contents\n",
            value: `\n\r
  ***List*** - Show current queue list
  ***Add*** - Add to the queue list
  *ex) ~queue add some_message*
  ***Insert*** - Insert into the queue list
  *ex) ~queue insert number some_message*
  ***Out*** - Delete your queue from the list

  \n\r
  `
          }
        ],

        footer: {
          icon_url:"https://i.postimg.cc/rmxgPCzB/2018-11-07-2-54-39.png",
          text: `\n\nIOU_BOT made by Coldsewoo (차가운새우#2410)`

        }
      }
    }).catch(function (err) {
      console.error(err);
    });
    } else
  if(!args[0] || args[0] === 'list') {
    var message2 = "```css\n";
    if (guilds[message.channel.id].queueContent.length === 0) {
      message.channel.send("```prolog\nNo one is IN to the queue currently```");
    } else
    {
    for (var i = 0; i < guilds[message.channel.id].queueContent.length; i++) {
      var temp = (i + 1) + ": " + guilds[message.channel.id].queue[i] + " [" + guilds[message.channel.id].queueContent[i] + "] " + (i < guilds[message.channel.id].maxIn[0] ? "  "+"<= current IN" : "") + "\n";
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);
  }
  } else

  if(args[0] === 'max')
{
    if(message.member.roles.find(role => role.name === "Admin"))
    {
      parseInt(content, 10);
      if(content > 0)
      {
        guilds[message.channel.id].maxIn.shift();
        guilds[message.channel.id].maxIn.push(content);
        message.reply("max IN set to: " + "**" + content + "**");
      } else
      {
        return message.reply("Max must bigger than 0");
      }
    } else {
      return message.reply("You do not have a permission to run this command.");
    }
}
  else
  if(args[0] === 'clear')
{
    if(message.member.roles.find(role => role.name === "Admin"))
    {
      guilds[message.channel.id].queue = [];
      guilds[message.channel.id].queueContent = [];
      message.reply("Queue list cleared!")
    } else {
      return message.reply("You do not have a permission to run this command.");
    }
} else
if(args[0] === 'out')
  {
    if(guilds[message.channel.id].queueId.length === 0)
    {
      return message.reply("```prolog\nNo one is IN to the queue currently```");
    } else
    if(guilds[message.channel.id].queueId.indexOf(member) === -1)
    {
      return message.reply("```prolog\nYou are not in the queue```");
    } else
    {
      for(var i = 1; i < guilds[message.channel.id].queue.length + 1; i++)
      {
        if(guilds[message.channel.id].queue[i-1] === member_Id)
        {
          queue_delete(member, i, message);
          if (i === 1){
            return;
          } else {
            message.reply("Queue on " + "**" + i + " : " + guilds[message.channel.id].queue[i] + "**" + " deleted!");
            return;
          }

        }
      }
    }
  }
else
if(args[0] === 'test')
{
  var deleteNum = message.content.split(' ').slice(2).join(" ");
  deleteNum = parseInt(deleteNum, 10);
  var lastqueue = guilds[message.channel.id].queueId.length;
  lastqueue = parseInt(deleteNum, 10);
  if (deleteNum === lastqueue)
  {
    console.log("same!");
  } else {
    console.log("not same?", deleteNum, lastqueue);
  }
} else
  {
    message.channel.send('error!');
  }


function add_to_queue(member, member_Id, content) {
    guilds[message.channel.id].queueId.push(member);
    guilds[message.channel.id].queue.push(member_Id);
    guilds[message.channel.id].queueContent.push(content);
}

function queue_delete(member, deleteNum, message)
{
  var lastqueue = guilds[message.channel.id].queueContent.length;
  if (deleteNum && deleteNum > 1)
  {
    if (deleteNum > guilds[message.channel.id].queueContent.length)
    {
      message.channel.send("deleteNum > queue length");
      return;
    } else

      if(parseInt(deleteNum, 10) === parseInt(lastqueue, 10))
      {
        message.reply("Queue on " + "**" + deleteNum + " : " + guilds[message.channel.id].queue[lastqueue-1] + "**" + " deleted!");
        guilds[message.channel.id].queueId.length--;
        guilds[message.channel.id].queue.length--;
        guilds[message.channel.id].queueContent.length--;
        lastqueue--;
      } else {
        for (var i = deleteNum - 1; i < guilds[message.channel.id].queue.length - 1 ; i++)
        {
          if (i === guilds[message.channel.id].queue.length - 2 )
          {
            message.reply("Queue on " + "**" + deleteNum + " : " + guilds[message.channel.id].queue[i] + "**" + " deleted!");
            guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i+1];
            guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i+1];
            guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i+1];
            guilds[message.channel.id].queueId[i+1] = [];
            guilds[message.channel.id].queue[i+1] = [];
            guilds[message.channel.id].queueContent[i+1] = [];
          } else
          {
            guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i+1];
            guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i+1];
            guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i+1];
          }
        }
          guilds[message.channel.id].queueId.length--;
          guilds[message.channel.id].queue.length--;
          guilds[message.channel.id].queueContent.length--;
          lastqueue--;

    }
  } else
    if (guilds[message.channel.id].queue.length === 0)
    {
      guilds[message.channel.id].queueId = [];
      guilds[message.channel.id].queue = [];
      guilds[message.channel.id].queueContent = [];
      lastqueue = 0;
    } else
    if (deleteNum > 0)
    {
      message.reply("Queue on " + "**" + "1" + " : " + guilds[message.channel.id].queue[0] + "**" + " deleted!");
      guilds[message.channel.id].queueId.shift();
      guilds[message.channel.id].queue.shift();
      guilds[message.channel.id].queueContent.shift();
      lastqueue--;
    } else
    {
      message.reply("Last queue - " + "**" + lastqueue + " : " + guilds[message.channel.id].queue[lastqueue - 1] + "**" + " deleted!");
      guilds[message.channel.id].queueId.length--;
      guilds[message.channel.id].queue.length--;
      guilds[message.channel.id].queueContent.length--;
      lastqueue--;
    }

}

function queue_insert(member, member_Id, message)
{
  var contents  = message.content.split(' ').slice(3).join(' ');
  var contentsString = contents.toString();
  const switchNum = args[1];
  parseInt(switchNum, 10);
  if (switchNum && switchNum > 0)
  {
    if (switchNum > guilds[message.channel.id].queueContent.length)
    {
      message.channel.send("switchNum > queue length");
      return;
    } else
    {
      guilds[message.channel.id].queueId.splice(switchNum-1,0,member_Id);
      guilds[message.channel.id].queue.splice(switchNum-1,0,member_Id);
      guilds[message.channel.id].queueContent.splice(switchNum-1,0,contentsString);
      message.reply("Inserted to Queue number:  " + "**" + switchNum + "**");
    };
  } else
    if (guilds[message.channel.id].queue.length === 0) {
      guilds[message.channel.id].queueId.push(member);
      guilds[message.channel.id].queue.push(member_Id);
      guilds[message.channel.id].queueContent.push(contentsString);
    } else return;
}
}
