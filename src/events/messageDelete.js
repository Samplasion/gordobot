/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 


module.exports = (bot,message) => {
    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;
    if(message.content.startsWith('!') && CH.getCommand(message.content.split(" ")[0])) return;
    message.guild.channels.get('608735561401892885').send(`\`\`\`yaml\nTYPE: MSG_DELETE\nAuthor: ${message.author.tag} (${message.author.id})\nMessage: ${message.content}\`\`\``)
}