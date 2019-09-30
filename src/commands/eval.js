/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
    name: 'eval',
  description: 'Evaluate javascript',
  usage: '<js>',
  cooldown: 0,
  aliases: ['ev', 'js'],
  access: 99,
  guildOnly: false,

  execute(message,args) {
    try{
        let code = args.join(' ');
        let evaled = eval(code);
        if(typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        message.channel.send(clean(evaled), {code:'xl'})
    } catch(err){
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};

const clean = text => {
    if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}