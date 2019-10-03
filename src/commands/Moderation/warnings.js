/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
    name: 'warnings',
    description: 'Show user\'s warnings',
    usage: '<@user>',
    cooldown: 0,
    aliases: ['warns'],
    access: 1,
    guildOnly: true,
  
    execute(message,args) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid member of this server");

        let warnings = JSON.parse(fs.readFileSync(__dirname+'/../data/warnings.json'))
        if(!warnings[member.user.id]) return message.reply('that user has 0 warnings')
        
        message.channel.send(`**${member.user.tag}'s warnings:**`)
        warnings[member.user.id].forEach(el => {
            message.channel.send(`\`\`\`yaml\nModerator: ${message.guild.members.get(el.modid).user.tag} (${el.modid})\nReason: ${el.reason}\`\`\``)
        });
    },
  };