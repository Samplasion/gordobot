/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
    name: 'unwarn',
    description: 'Remove a warning',
    usage: '<@user> <warn number>',
    cooldown: 0,
    aliases: ['rmwarn'],
    access: 1,
    guildOnly: true,
  
    execute(message,args) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid member of this server");
        if(member.manageable && !member.hasPermission('MANAGE_MESSAGES')){
            let num = args[1]-1
            if(!num) return message.reply('warning number is required')

            let warnings = JSON.parse(fs.readFileSync(__dirname+'/../../data/warnings.json'))
            if(!warnings[member.user.id]) return message.reply('that user doesn\'t have any warnings')
            warnings[member.user.id].forEach((val, index) => {
                if(index==num){
                    let origreason = warnings[member.user.id][index].reason
                    warnings[member.user.id].splice(index,1)
                    fs.writeFileSync(__dirname+'/../../data/warnings.json', JSON.stringify(warnings))
                    message.reply(`:white_check_mark: warning removed`)
                    message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nTarget: ${member.user.tag} (${member.user.id})\nAction: UNWARN\nOriginal Warn Reason: ${origreason}\`\`\``)
                }
            })
        } else {
            return message.reply('I cannot unwarn that user.')
        }
    },
  };