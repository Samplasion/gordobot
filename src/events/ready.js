/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = bot => {
    console.info(`Logged in as ${bot.user.tag}`);
    bot.user.setActivity('iOS Jailbreak', {type: 'WATCHING'})
}