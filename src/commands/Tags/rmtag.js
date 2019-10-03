/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
    name: 'rmtag',
    description: 'Remove a tag',
    usage: '<tag>',
    cooldown: 0,
    aliases: ['removetag'],
    access: 1,
    guildOnly: true,
  
    execute(message,args) {
        if(!args[0]) return message.reply('name is required')
        let name = args[0].toLowerCase()
        let tags = JSON.parse(fs.readFileSync(__dirname+'/../data/tags.json'))
        if(!tags[name]) return message.reply('tag not found')
        delete tags[name]
        fs.writeFileSync(__dirname+'/../data/tags.json', JSON.stringify(tags));
        message.reply(`tag ${args[0]} removed`)
    },
  };