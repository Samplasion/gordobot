/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const { handleCMD } = require(__dirname+'/../common/CommandHandler');

module.exports = (bot,message) => {
    if(!message.content.startsWith(process.env.CMDPREFIX) || message.author.bot) return;
    
    const args = message.content.slice(process.env.CMDPREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    handleCMD(bot, commandName, message, args);
}