/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

module.exports = {
	  name: '8ball',
    description: 'Have the bot answer your question',
    usage: '<question>',
    cooldown: 10,
    aliases: ['8b'],
    access: 0,
    guildOnly: true,

	execute(message,args) {
        let possible = ['yes', 'no', '100% positive', 'it depends', 'all the time', 'never', 'mostly', 'surely not', 'try again'];
        let answer = possible[Math.floor(Math.random()*possible.length)];
        const embed = {
            "color": 4803071,
            "author": {
              "name": message.author.tag,
              "icon_url": message.author.avatarURL
            },
            "footer": {
                "text": `Initiated by: ${message.author.id}`
            },
            "fields": [
              {
                "name": "Question",
                "value": args.join(' '),
              },
              {
                "name": "Answer",
                "value": answer
              },
            ]
        };
        message.channel.send({embed:embed})
	},
};