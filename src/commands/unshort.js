/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const unshort = require('url-unshorten')

module.exports = {
  name: 'unshort',
  description: 'Unshorten URL in above message',
  usage: '',
  cooldown: 10,
  aliases: ['us','unshorten'],
  access: 99,
  guildOnly: true,

    /* Castyte: WIP
     * Likely error in url-unshorten module
    */

  async execute(message,args) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let msg = await message.channel.fetchMessages({limit:2}).then(msgs => msgs.last());
    let url = msg.content.replace(urlRegex, (url) => {return url});
    if(!url) return message.reply('no url detected')
    unshort(url).then(s => {
        if(s) message.channel.send(s);
    })
  },
};