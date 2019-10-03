/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const { handleCMD } = require(__dirname+'/../common/CommandHandler');
const tweakSearch = require(__dirname+'/../common/tweakSearch')
const xp = require('../common/xp.js');

module.exports = (bot,message) => {
    if(message.author.bot) return;
    if(message.content.includes('[[') && message.content.includes(']]') && message.content.indexOf('[[') < message.content.indexOf(']]')) return tweakSearch(message);
    if(!message.content.startsWith(process.env.CMDPREFIX)){
        if(bot.cooldowns.has(message.author.id)) return;
		xp.do(message);
		bot.cooldowns.set(message.author.id, true);
		return setTimeout(() => bot.cooldowns.delete(message.author.id,true), 5000);
    }
    
    const args = message.content.slice(process.env.CMDPREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    handleCMD(bot, commandName, message, args);
}