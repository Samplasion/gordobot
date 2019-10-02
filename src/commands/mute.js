/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'Mute a user',
    usage: '<@user> <time> [reason]',
    cooldown: 0,
    aliases: ['m'],
    access: 1,
    guildOnly: true,
  
    async execute(message,args) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid member of this server");
        if(!args[1]) return message.reply('Please specify a time to mute')
        if(member.manageable && !member.hasPermission('MANAGE_MESSAGES') || message.author.id==518894700003065872){
            let reason = args.slice(2).join(' ');
            if(!reason) reason = "No reason provided";
            await member.addRole('606229326941126656', `${reason} [BOT MUTE BY: ${message.author.id}]`).catch(err => {return message.reply('an unknown error occured')})
            message.channel.send(`:white_check_mark: ${member.user.tag} muted for ${args[1]} with reason: ${reason}`)
            message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nTarget: ${member.user.tag} (${member.user.id})\nAction: MUTE\nTime: ${args[1]}\nReason: ${reason}\`\`\``)
            member.send(`You have been muted for ${args[1]} in iosjailbreak`)
            setTimeout(() => {
                member.removeRole('606229326941126656', 'BOT UNMUTE')
            }, ms(args[1]))
        } else {
            return message.reply('I cannot mute that user.')
        }
    },
  };