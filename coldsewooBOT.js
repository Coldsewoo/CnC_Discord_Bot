const Discord = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')
// const path = require('path')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const facebookURL = 'https://www.facebook.com/pg/Idle-Online-Universe-IOU-RPG-320106674851481/posts/?ref=page_internal'
global.__basedir = __dirname

// firestore initialization
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-adminsdk.json')
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cnc-discord-bot.firebaseio.com'
  })
}
const db = admin.firestore()
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

const client = new Discord.Client()
const config = require('./config.json')
client.config = config

client.on('ready', () => {
  client.user.setActivity('Use ~help for more info XD', {
    type: 'PLAYING'
  })
})

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
  })
})

// read commands dir and set each keyword as linked in command prop in client.commands
client.commands = new Enmap()
fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!fs.statSync('./commands/' + file).isDirectory()) {
      if (!file.endsWith('.js')) {

      } else {
        let props = require(`./commands/${file}`)
        let commandName = file.split('.')[0]
        console.log(`Attempting to load command ${commandName}`)
        client.commands.set(commandName, props)
      }
    } else {
      if (file === 'others') return
      fs.readdir(`./commands/${file}`, (err, innerFiles) => {
        if (err) return console.error(err)

        innerFiles.forEach(innerFile => {
          if (!innerFile.endsWith('.js')) return
          let props = require(`./commands/${file}/${innerFile}`)
          let commandName = innerFile.split('.')[0]
          console.log(`Attempting to load command ${commandName}`)
          client.commands.set(commandName, props)
        })
      })
    }
  })
})

setInterval(function () {
  var facebookArray = []
  try {
    fetch(facebookURL)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body)
        let $div = $("div[id='pagelet_timeline_main_column']")
        $div.each((i, el) => {
          var $el = $(el)
          var textArr = $el
            .find('p')
            .first()
            .text()
          var result = textArr.split(/\s/)
          const codesReg = /(c|C)odes\.{1,3}/
          const cheersReg = /(c|C)heers,/
          let firstIndex, lastIndex
          for (const index in result) {
            if (codesReg.test(result[index])) firstIndex = index
            else if (cheersReg.test(result[index])) lastIndex = index
            else continue
          }
          for (let i = parseInt(firstIndex) + 1; i < parseInt(lastIndex); i++) {
            facebookArray.push(result[i])
          }
        })
        return facebookArray
      })
      .then(facebookArray => {
        var msgArray = []
        const channelId = '453517489561665536'
        const codeChannel = client.channels.get(channelId)
        codeChannel
          .fetchMessages({
            limit: 3
          })
          .then(collected => {
            collected.forEach(msg => {
              let tempArr = msg.content.split(/\n/)
              msgArray.push(...tempArr)
            })
            return Promise.resolve([facebookArray, msgArray])
          })
          .then(([facebookArray, msgArray]) => {
            if (!msgArray.includes(facebookArray[0])) {
              codeChannel.send(facebookArray)
            }
          })
      })
  } catch (err) {
    console.log(err)
  }
}, 30 * 60 * 1000)

client.on('UnhandledPromiseRejectionWarning', (err) => {
  console.error(err)
})

client.login(config.token)
module.exports = db
