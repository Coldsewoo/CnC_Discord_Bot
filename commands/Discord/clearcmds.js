const globalVar = require(`${__basedir}/globalVar.js`);
const Global = globalVar.Global;

exports.run = (client, message, args) => {
  const hasAdminRole = message.member.roles.some(roles => Global.adminRole.includes(roles.name));
  if (hasAdminRole === false) return message.reply('You do not have a permission to run this command');
  const input = parseInt(args[0], 10);
  if (!input) return message.reply('Number?');

  async function clearCommands(rest, cleared) {
    let requestedNum = rest;
    let currentCleared = cleared;

    const fetchLimit = requestedNum > 100 ? 100 : requestedNum;
    const now = Date.parse(new Date());

    try {
      const fetched = await message.channel.fetchMessages({
        limit: fetchLimit,
      });
      const needDelete = await fetched.filter((msg) => {
        const timeStamp = msg.createdTimestamp;
        const timeDiff = Math.abs(now - timeStamp) / 1000 / 60 / 60 / 24;
        if ((msg.content.startsWith('!') || msg.content.startsWith('~') || msg.content.startsWith('.') || msg.author.bot) && timeDiff < 14) {
          return true;
        }
        return false;
      });
      const needManuallyDelete = await fetched.filter((msg) => {
        const timeStamp = msg.createdTimestamp;
        const timeDiff = Math.abs(now - timeStamp) / 1000 / 60 / 60 / 24;
        if ((msg.content.startsWith('!') || msg.content.startsWith('~') || msg.content.startsWith('.') || msg.author.bot) && timeDiff >= 14) {
          return true;
        }
        return false;
      });
      Promise.all([message.channel.bulkDelete(needDelete), manualDelete(needManuallyDelete)])
        .then(() => {
          const needDeleteLength = needDelete.array().length;
          const needManuallyDeleteLength = needManuallyDelete.array().length;
          requestedNum -= fetched.size;
          currentCleared = currentCleared + needDeleteLength + needManuallyDeleteLength;
          const timeout = 1000 + needManuallyDeleteLength * 200;
          setTimeout(() => {
            if (requestedNum > 0 && fetched.size > 1) clearCommands(requestedNum, currentCleared);
            else message.channel.send(`${currentCleared} Messages Cleared!`);
          }, timeout);
        }).catch(err => console.log(err));

      function manualDelete(msgs) {
        const Promises = msgs.map(messageDelete);
        return Promise.all(Promises);
        function messageDelete(msg) {
          return msg.delete();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  clearCommands(input, 0);
};
