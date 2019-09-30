/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

// Imports
require('dotenv').config();
const Discord = require('discord.js');
var bot = new Discord.Client();

// Handlers
const { initCH } = require('./common/CommandHandler');
const { initEH } = require('./common/EventHandler')

// Init handlers
initCH(bot, 'commands');
initEH(bot, 'events')

bot.login(process.env.DCTOKEN);