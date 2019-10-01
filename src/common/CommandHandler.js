/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const Discord = require('discord.js');
const fs = require('fs');
const xp = require('./xp.js');

module.exports.initCH = (bot, dir) => {
    bot.commands = new Discord.Collection();

    const commandFiles = fs.readdirSync(__dirname+`/../${dir}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(__dirname+`/../${dir}/${file}`);
		bot.commands.set(command.name, command);
		console.info(`Loaded command '${command.name}'`)
    }

    bot.cooldowns = new Discord.Collection();
}

module.exports.handleCMD = (bot, commandName, message, args) => {
    const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command){
		if(bot.cooldowns.has(message.author.id)) return;
		xp.do(message);
		bot.cooldowns.set(message.author.id, true);
		return setTimeout(() => bot.cooldowns.delete(message.author.id), 5000);
	}

	message.delete()
	
	var canrun = false;

	if(command.access!==0){
		switch(command.access){
			case 1:
				if(message.member.hasPermission('MANAGE_MESSAGES')) canrun =  true;
				break;
			case 2:
				if(message.member.hasPermission('MANAGE_SERVER')) canrun =  true;
				break;
			case 3:
				if(message.member.roles.has(process.env.GENIUSID)) canrun =  true;
				break;
			case 4:
				if(message.member.roles.has(process.env.DIAMONDID)) canrun = true
			case 99:
				if(message.author.id===process.env.OWNERID) canrun =  true;
				break;
			default:
				canrun = false;
		}
	} else {
		canrun = true
	}

	if(!canrun) return message.reply('you don\'t have permission to run that command')

	if (command.guildOnly && message.channel.type !== 'text') return


	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nUsage: \`${process.env.CMDPREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!bot.cooldowns.has(command.name)) {
		bot.cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = bot.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(0)} more second(s) before using the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('an unknown error occured');
	}
}