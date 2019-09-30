/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const Discord = ('discord.js');

module.exports = {
  name: 'emoji',
  description: 'Send emoji as image',
  usage: '<emoji>',
  cooldown: 5,
  aliases: ['emote', 'e'],
  access: 0,
  guildOnly: true,

  execute(message,args) {
    let matches = args[0].match(/<(a?):(.*):([0-9]*)>/)
    if(!matches) return message.reply('emoji is required')
    let emoji = `${matches[3]}.${matches[1] === 'a' ? 'gif' : 'png'}`;
    message.channel.send(new Discord.Attachment(`https://cdn.discordapp.com/emojis/${emoji}`, `${matches[2]}_${emoji}`))
  },
};