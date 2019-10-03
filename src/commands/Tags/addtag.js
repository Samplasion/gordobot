/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
  name: 'addtag',
  description: 'Add a tag',
  usage: '<name> <content>',
  cooldown: 5,
  aliases: ['at'],
  access: 1,
  guildOnly: true,

  execute(message,args) {
    if(!args[0] || !args[1]) return message.reply('name and text is required')
    let text = args.slice(1).join(' ');
    let name = args[0].toLowerCase()
    let tags = JSON.parse(fs.readFileSync(__dirname+'/../../data/tags.json'))
    if(tags[name]) return message.reply('that tag already exists')
    tags[name] = text;
    fs.writeFileSync(__dirname+'/../../data/tags.json', JSON.stringify(tags));
    message.reply(`tag ${args[0]} added`)
  },
};