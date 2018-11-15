var fs = require('fs');
var path = require('path');
var guilds = {};

exports.run = (client, message, args) => {

  if (args[0]) args[0] = args[0].toLowerCase();
  const member = message.member.id;
  const mess = message.content.toLowerCase();
  const content = message.content.split(' ').slice(2).join(" ");
  const member_Id = message.member.displayName;
  const isInNum = 1;
  const isNotInNum = 2;
  const numArray = ["Zero","ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"];
  const leaderRole = ["BR Leadership", "CS Leadership", "The Collectives Leadership", "Imaginarium Leadership", "Fresh Air Leadership", "Always Online Leadership", "Admin"];
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

  if (!message.member.roles.find(r => r.name === 'CnCmember')) return message.reply("You are not CnC member!");

  if(!guilds[message.channel.id]) {
    guilds[message.channel.id] = {
      queue: [],
      queueContent: [],
      queueId: [],
      isIn: [],
      maxIn: [1]
    };
}

if(!args[0] || args[0] === 'list') {
  var message2 = "```css\n ";

  if (parseInt(guilds[message.channel.id].maxIn, 10) === 1)
  {
    message2 += "[There is ONE free spot]\n";
  } else
  {
    message2 += `[There are ${numArray[guilds[message.channel.id].maxIn]} free spots]\n`;
  }

  if (guilds[message.channel.id].queueContent.length === 0) {

    if (parseInt(guilds[message.channel.id].maxIn, 10) === 1)
    {
      message.channel.send(`\`\`\`css\n[There is ONE free spot]\nNo one is IN to the queue currently\`\`\``);
    } else
    {
      message.channel.send(`\`\`\`css\n[There are ${numArray[guilds[message.channel.id].maxIn]} free spots]\nNo one is IN to the queue currently\`\`\``);
    }
  } else
  {
  for (var i = 0; i < guilds[message.channel.id].queueContent.length; i++) {
    var temp = (i + 1) + ": " + guilds[message.channel.id].queue[i] + " [" + guilds[message.channel.id].queueContent[i] + "] " + (guilds[message.channel.id].isIn[i] === 1
       ? "  "+"<= current IN" : "") + "\n";
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
  if(args[0] === 'add') {
    add_to_queue(member, member_Id, content);
    message.reply('Added to Queue number:  ' + "**" + guilds[message.channel.id].queueContent.length + "**");
  } else
  if(args[0] === 'delete' || args[0] === 'remove') {
    if(message.member.roles.find(role => leaderRole.indexOf(role.name) != -1))
    {
      const deleteNum = message.content.split(' ').slice(2).join(" ");
      parseInt(deleteNum, 10);
      queue_delete(member, deleteNum, message);
    } else
    {
      message.reply("You do not have a permission to run this command");
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
  ***IN*** - Flag yourself as being inside the guild
  ***Out*** - Delete your queue from the list

  For ADMINS
  ***Delete*** - Delete specific queue number on list
  *You can also use ~queue remove*
  *ex) ~queue delete 3*
  ***Clear*** - Clear whole queue list
  ***Max*** - Set the max IN availble
  *-> Depends on current free spot(s)*
  *ex) ~queue max 2*
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
  if(args[0] === 'max')
{
    if(message.member.roles.find(role => leaderRole.indexOf(role.name) != -1))
    {
      parseInt(content, 10);
      if(content > 5) return message.reply("Max Number cant be more than 5");
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
    if(message.member.roles.find(role => leaderRole.indexOf(role.name) != -1))
    {
      guilds[message.channel.id].queueId = [];
      guilds[message.channel.id].queue = [];
      guilds[message.channel.id].queueContent = [];
      guilds[message.channel.id].isIn = [];
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
          return;
        }
      }
    }
  }
else
if(args[0] === 'test')
{
  for (var i = 0; i < guilds[message.channel.id].queueId.length; i++)
  {
    message.channel.send(guilds[message.channel.id].queue[i] + "//" + guilds[message.channel.id].queueContent[i]);
  }
} else
if(args[0] === 'in')
  {
    if(guilds[message.channel.id].isIn.length === 0)
    {
      return message.reply("There is no one in the queue at this moment*.*");
    } else
    if(guilds[message.channel.id].queueId.indexOf(member) === -1)
    {
      return message.reply("```prolog\nYou are not in the queue```");
    } else
    {
      var messageIn = "```prolog\n No free spot(s) left. Current IN -  \n";
      for(var i = 1; i < guilds[message.channel.id].queue.length + 1; i++)
        {
          const currentIn = guilds[message.channel.id].isIn.filter(j => j === isInNum).length;
          if (currentIn >= guilds[message.channel.id].maxIn)
          {
            if (guilds[message.channel.id].isIn[i-1] === isInNum) {
              var temp2 =  "   " + i + " : " + guilds[message.channel.id].queue[i-1] + "  [" + guilds[message.channel.id].queueContent[i-1] + "]\n";
              messageIn += temp2;
            }
          } else
          if(guilds[message.channel.id].queue[i-1] === member_Id)
          {

            if (guilds[message.channel.id].isIn[i-1] === isInNum){
              message.reply("*You are already IN* with" + "**  "+ i + " : " + guilds[message.channel.id].queue[i-1] + (guilds[message.channel.id].queueContent[i-1] ? "  [" + guilds[message.channel.id].queueContent[i-1] + "]**" : "**" ));
              return;
            } else
            {
              guilds[message.channel.id].isIn[i-1] = 1;
              if(guilds[message.channel.id].queueContent[i-1])
              {
                message.reply("**" + guilds[message.channel.id].queue[i-1] + " [" + guilds[message.channel.id].queueContent[i-1] + "]** is now **IN**");
              } else {
                message.reply("*You are now* ***IN***");
              }

              return;
            }

          }

        }
        messageIn += "```";
        message.channel.send(messageIn);
        messageIn = "```";
    }
    }
   else
  {
    message.channel.send('Wrong command! See ~queue help');
  }


function add_to_queue(member, member_Id, content) {
    guilds[message.channel.id].queueId.push(member);
    guilds[message.channel.id].queue.push(member_Id);
    guilds[message.channel.id].queueContent.push(content);
    guilds[message.channel.id].isIn.push(isNotInNum);

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
        message.reply("Queue on " + "**" + deleteNum + " : " + guilds[message.channel.id].queue[lastqueue-1] + "  [" + guilds[message.channel.id].queueContent[lastqueue-1] +"]**" + " deleted!");
        guilds[message.channel.id].queueId.length--;
        guilds[message.channel.id].queue.length--;
        guilds[message.channel.id].queueContent.length--;
        guilds[message.channel.id].isIn.length--;
        lastqueue--;
      } else {
        for (var i = deleteNum - 1; i < guilds[message.channel.id].queue.length - 1 ; i++)
        {
          if (i === guilds[message.channel.id].queue.length - 2 )
          {
            message.reply("Queue on " + "**" + deleteNum + " : " + (deletedId ? deletedId : guilds[message.channel.id].queue[i]) + "  [" + (deletedContent ? deletedContent : guilds[message.channel.id].queueContent[i]) + "]**" + " deleted!");
            guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i+1];
            guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i+1];
            guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i+1];
            guilds[message.channel.id].isIn[i] = guilds[message.channel.id].isIn[i+1];
            guilds[message.channel.id].queueId[i+1] = [];
            guilds[message.channel.id].queue[i+1] = [];
            guilds[message.channel.id].queueContent[i+1] = [];
            guilds[message.channel.id].isIn[i+1] = [];
          } else
          {
            var deletedId = guilds[message.channel.id].queue[i];
            var deletedContent = guilds[message.channel.id].queueContent[i];
            guilds[message.channel.id].queueId[i] = guilds[message.channel.id].queueId[i+1];
            guilds[message.channel.id].queue[i] = guilds[message.channel.id].queue[i+1];
            guilds[message.channel.id].queueContent[i] = guilds[message.channel.id].queueContent[i+1];
            guilds[message.channel.id].isIn[i] = guilds[message.channel.id].isIn[i+1];
          }
        }
          guilds[message.channel.id].queueId.length--;
          guilds[message.channel.id].queue.length--;
          guilds[message.channel.id].queueContent.length--;
          guilds[message.channel.id].isIn.length--;
          lastqueue--;

    }
  } else
    if (guilds[message.channel.id].queue.length === 0)
    {
      guilds[message.channel.id].queueId = [];
      guilds[message.channel.id].queue = [];
      guilds[message.channel.id].queueContent = [];
      guilds[message.channel.id].isIn = [];
      lastqueue = 0;
    } else
    if (deleteNum > 0)
    {
      message.reply("Queue on " + "**" + "1" + " : " + guilds[message.channel.id].queue[0] + "  [" + guilds[message.channel.id].queueContent[0] + "]** deleted!");
      guilds[message.channel.id].queueId.shift();
      guilds[message.channel.id].queue.shift();
      guilds[message.channel.id].queueContent.shift();
      guilds[message.channel.id].isIn.shift();
      lastqueue--;
    } else
    {
      message.reply("Queue on " + "**" + lastqueue + " : " + guilds[message.channel.id].queue[lastqueue - 1] + "  ["+ guilds[message.channel.id].queueContent[lastqueue - 1] +  "]**" + "deleted!");
      guilds[message.channel.id].queueId.length--;
      guilds[message.channel.id].queue.length--;
      guilds[message.channel.id].queueContent.length--;
      guilds[message.channel.id].isIn.length--;
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
      guilds[message.channel.id].queueId.splice(switchNum-1,0,member);
      guilds[message.channel.id].queue.splice(switchNum-1,0,member_Id);
      guilds[message.channel.id].queueContent.splice(switchNum-1,0,contentsString);
      guilds[message.channel.id].isIn.splice(switchNum-1,0,'0');
      message.reply("Inserted to Queue number:  " + "**" + switchNum + "** [" + guilds[message.channel.id].queueContent[switchNum-1] + "]");
    };
  } else
    if (guilds[message.channel.id].queue.length === 0) {
      guilds[message.channel.id].queueId.push(member);
      guilds[message.channel.id].queue.push(member_Id);
      guilds[message.channel.id].queueContent.push(contentsString);
      guilds[message.channel.id].queue.push(isNotInNum);

    } else return;
}
}