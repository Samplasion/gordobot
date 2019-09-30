/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
    name: 'purge',
    description: 'Mass delete messages',
    usage: '<count>',
    cooldown: 0,
    aliases: ['p'],
    access: 1,
    guildOnly: true,
  
    async execute(message,args) {
        const deleteCount = parseInt(args[0], 10);
        if(!deleteCount || deleteCount < 2 || deleteCount > 1000) return message.reply("please provide a number between 2 and 1000 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        message.channel.bulkDelete(fetched).catch(error => message.reply(`an unknown error occured`));
    },
  };