/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
    name: 'say',
    description: 'Send message as bot',
    usage: '[#channel] <message>',
    cooldown: 0,
    aliases: [],
    access: 1,
    guildOnly: true,
  
    execute(message,args) {
        var channel
        var msg
        if(message.mentions.channels.first()){
            channel = message.mentions.channels.first()
            msg = args.slice(1).join(' ')
        } else {
            channel = message.channel
            msg = args.join(' ')
        }
        if(!msg) return message.reply('message is required');
        channel.send(msg);
    },
  };