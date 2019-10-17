/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
    name: 'warn',
    description: 'Add a warning',
    usage: '<@user> <reason>',
    cooldown: 0,
    aliases: ['w'],
    access: 99, //1,
    guildOnly: true,
  
    execute(message,args) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid member of this server");
        if(member.manageable && !member.hasPermission('MANAGE_MESSAGES') || message.author.id==518894700003065872){
            let reason = args.slice(1).join(' ');
            if(!reason) return message.reply('reason is required')

            let warnings = JSON.parse(fs.readFileSync(__dirname+'/../../data/warnings.json'))
            if(!warnings[member.user.id]) warnings[member.user.id] = []
            warnings[member.user.id].push({modid:message.author.id,reason:reason});
            fs.writeFileSync(__dirname+'/../../data/warnings.json', JSON.stringify(warnings))
            message.reply(`:white_check_mark: ${member.user.tag} warned with reason: ${reason}`)
            if(warnings[member.user.id].length==3) message.reply(`${member.user.tag} now has 3 warnings`)
            message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nTarget: ${member.user.tag} (${member.user.id})\nAction: WARN\nReason: ${reason}\`\`\``)
            member.send(`You have been warned in iosjailbreak: ${reason}`)
        } else {
            return message.reply('I cannot warn that user.')
        }
    },
  };