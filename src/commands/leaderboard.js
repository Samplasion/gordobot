/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
  name: 'leaderboard',
  description: 'Show xp leaderbaord',
  usage: '',
  cooldown: 10,
  aliases: ['lb'],
  access: 0,
  guildOnly: true,

  execute(message,args) {
    let xp = JSON.parse(fs.readFileSync(__dirname+'/../data/xp.json'))
    var scores = []
    Object.keys(xp).forEach((val) => {
        scores.push({xp: xp[val].xp,level:xp[val].level,user:val})
    })
    scores = scores.sort((a,b)=> {
        return b.xp - a.xp
    });
    const embed = {
        "color": 4803071,
        "title": "iOS Jailbreak Level Leaderboard",
        "fields": [
          {
            "name": `__**#1**   |  Level ${scores[0].level}  -  ${scores[0].xp} XP__`,
            "value": `<@${scores[0].user}>`,
          },
          {
            "name": `__**#2**   |  Level ${scores[1].level} - ${scores[1].xp} XP__`,
            "value": `<@${scores[1].user}>`,
          },
          {
            "name": `__**#3**   |  Level ${scores[2].level} - ${scores[2].xp} XP__`,
            "value": `<@${scores[2].user}>`,
          },
          {
            "name": `__**#4**   |  Level ${scores[3].level} - ${scores[3].xp} XP__`,
            "value": `<@${scores[3].user}>`,
          },
          {
            "name": `__**#5**   |  Level ${scores[4].level} - ${scores[4].xp} XP__`,
            "value": `<@${scores[4].user}>`,
          },
          {
            "name": `__**#6**   |  Level ${scores[5].level} - ${scores[5].xp} XP__`,
            "value": `<@${scores[5].user}>`,
          },
          {
            "name": `__**#7**   |  Level ${scores[6].level} - ${scores[6].xp} XP__`,
            "value": `<@${scores[6].user}>`,
          },
          {
            "name": `__**#8**   |  Level ${scores[7].level} - ${scores[7].xp} XP__`,
            "value": `<@${scores[7].user}>`,
          },
          {
            "name": `__**#9**   |  Level ${scores[8].level} - ${scores[8].xp} XP__`,
            "value": `<@${scores[8].user}>`,
          },
          {
            "name": `__**#10**   |  Level ${scores[9].level} - ${scores[9].xp} XP__`,
            "value": `<@${scores[9].user}>`,
          },
        ]
      };
      message.channel.send({embed:embed})
  },
};