/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs');

module.exports = {
  name: 'tag',
  description: 'Show the specified tag',
  usage: '<tag>',
  cooldown: 5,
  aliases: ['t', 'showtag'],
  access: 0,
  guildOnly: true,

  execute(message,args) {
    let name = args[0].toLowerCase()
    let tags = JSON.parse(fs.readFileSync(__dirname+'/../data/tags.json'))
    if(!tags[name]) return message.reply('tag not found')
    message.channel.send(tags[name])
  },
};