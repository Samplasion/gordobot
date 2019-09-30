/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 


module.exports = (bot,oldMessage,newMessage) => {
    if(newMessage.channel.type === 'dm') return;
    if(newMessage.author.bot) return;
    if(oldMessage.content==newMessage.content) return;
    newMessage.guild.channels.get('608735561401892885').send(`\`\`\`yaml\nTYPE: MSG_EDIT\nAuthor: ${newMessage.author.tag} (${newMessage.author.id})\nOld Message: ${oldMessage.content}\nNew Message: ${newMessage.content}\`\`\``)
}