/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
    name: 'raid',
    description: 'Enable/disable raid mode',
    usage: '',
    cooldown: 0,
    aliases: ['raidmode'],
    access: 1,
    guildOnly: true,
  
    execute(message,args) {
        let raidmodechannel = message.guild.channels.find(c => c.name==='raid-mode')
        if(!raidmodechannel){
            message.guild.channels.forEach(channel => channel.edit({rateLimitPerUser: 21600}));
            message.guild.createChannel('raid-mode',{type: 'text', position: 0}).then(channel => {
                channel.send(`The server has been set to raid mode by a moderator.\nAll channels have been set to slowmode.`)
                message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nAction: RAID MODE ENABLE\`\`\``)
                message.guild.channels.get('606096323711729695').send('@everyone RAID MODE ENABLED')
                return channel;
            }).then(channel => channel.overwritePermissions(message.guild.id, {SEND_MESSAGES:false,ADD_REACTIONS:false}))
        } else {
            message.guild.channels.forEach(channel => channel.edit({rateLimitPerUser: 0}));
            raidmodechannel.delete()
            message.guild.channels.get('606111745496318012').send(`\`\`\`yaml\nModerator: ${message.author.tag} (${message.author.id})\nAction: RAID MODE DISABLE\`\`\``)
        }
    },
  };