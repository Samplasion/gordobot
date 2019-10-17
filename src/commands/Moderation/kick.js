/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
    name: 'kick',
    description: 'Kick a user',
    usage: '<@user> [reason]',
    cooldown: 0,
    aliases: ['k'],
    access: 99, //1,
    guildOnly: true,
  
    async execute(message,args) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid member of this server");
        if(member.kickable && !member.hasPermission('MANAGE_MESSAGES') || message.author.id==518894700003065872){
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "No reason provided";
            await member.kick(reason).catch(err => {return message.reply('an unknown error occured')})
            message.channel.send(`:white_check_mark: ${member.user.tag} kicked with reason: ${reason}`)
            message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nTarget: ${member.user.tag} (${member.user.id})\nAction: KICK\nReason: ${reason}\`\`\``)
        } else {
            return message.reply('I cannot kick that user.')
        }
    },
  };