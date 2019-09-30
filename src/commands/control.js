/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fetch = require('node-fetch')

module.exports = {
	name: 'control',
    description: 'Show the specified package\'s control file',
    usage: '<packageid>',
    cooldown: 10,
    aliases: ['pkginfo'],
    access: 0,
    guildOnly: true,

	async execute(message,args) {
        let data = await fetch(`https://castyte-aptview.glitch.me/p/${encodeURIComponent(args[0])}`, {headers: {'X-Token': process.env.TWEAKSEARCHTOKEN}}).then(checkStatus)
        if(data){
            let json = await data.json()
            message.channel.send(`\`\`\`${json.raw}\`\`\``)
        } else {
            message.reply('package not found')
        }
	},
};

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    }
}