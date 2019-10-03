/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
    name: 'clearwarns',
    description: 'Clear warnings for user',
    usage: '<@user> [reason]',
    cooldown: 0,
    aliases: ['clearw'],
    access: 1,
    guildOnly: true,
  
    execute(message,args) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid member of this server");

        let warnings = JSON.parse(fs.readFileSync(__dirname+'/../../data/warnings.json'))
        if(!warnings[member.user.id]) return message.reply('that user has 0 warnings')
        delete warnings[member.user.id]
        fs.writeFileSync(__dirname+'/../../data/warnings.json', JSON.stringify(warnings))
        message.reply(`warnings cleared for ${member.user.tag}`)
        message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nTarget: ${member.user.tag} (${member.user.id})\nAction: CLEARWARNS\`\`\``)
    },
  };