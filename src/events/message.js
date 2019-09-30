/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const { handleCMD } = require(__dirname+'/../common/CommandHandler');
const tweakSearch = require(__dirname+'/../common/tweakSearch')

module.exports = (bot,message) => {
    if(message.content.includes('[[') && message.content.includes(']]') && message.content.indexOf('[[') < message.content.indexOf(']]')) return tweakSearch(message);
    if(!message.content.startsWith(process.env.CMDPREFIX) || message.author.bot) return;
    
    const args = message.content.slice(process.env.CMDPREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    handleCMD(bot, commandName, message, args);
}