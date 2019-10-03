/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
	name: 'ping',
    description: 'Ping!',
    usage: '',
    cooldown: 5,
    aliases: null,
    access: 0,
    guildOnly: true,

	execute(message) {
		message.channel.send('Pong.');
	},
};