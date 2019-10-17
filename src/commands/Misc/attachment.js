/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
  name: 'attachment',
  description: 'Returns the link for an attachment',
  usage: '{{message attachment}}',
  cooldown: 5,
  aliases: ['attach', 'link'],
  access: 0,
  guildOnly: true,

  execute(message) {
    if (message.attachments && message.attachments.first()) {
        message.reply(message.attachments.first().url)
    } else message.reply("You didn't attach anything")
  },
};
