/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs');

module.exports = {
  name: 'tags',
  description: 'Show all tags',
  usage: '',
  cooldown: 5,
  aliases: ['taglist','alltags'],
  access: 0,
  guildOnly: true,

  execute(message,args) {
    let tags = JSON.parse(fs.readFileSync(__dirname+'/../data/tags.json'))
    message.channel.send("__Available tags:__\n"+Object.keys(tags).join('\n'))
  },
};