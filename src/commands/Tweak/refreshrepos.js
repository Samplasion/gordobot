/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fetch = require('node-fetch')

module.exports = {
  name: 'refreshrepos',
  description: 'Refresh tweak repos',
  usage: '',
  cooldown: 0,
  aliases: ['refreshr'],
  access: 99,
  guildOnly: false,

  async execute(message,args) {
    await fetch(`https://castyte-aptview.glitch.me/refresh`, {headers: {'X-Token': process.env.TWEAKSEARCHTOKEN}}).then((res) => {
        if(res.ok){
            message.reply('repos refreshed successfully')
        } else {
            message.reply('refresh failed')
        }
    })
  },
};
