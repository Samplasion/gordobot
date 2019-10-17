/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

var Discord = require('discord.js')

module.exports = {
  name: 'attachment',
  description: 'Returns the link for an attachment',
  usage: '',
  cooldown: 5,
  aliases: ['attach', 'link'],
  access: 0,
  guildOnly: false,

  execute(message,args) {
    if (message.attachments && message.attachments.first()) {
      message.reply(message.attachments.first().url)
    } else message.reply("You didn't attach anything")
  },
};
