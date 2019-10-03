/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = {
    name: 'rank',
    description: 'Show users/your rank',
    usage: '[@user]',
    cooldown: 10,
    aliases: ['xp','stats'],
    access: 0,
    guildOnly: true,
  
    execute(message,args) {
        var member
        if(message.guild.members.get(args[0])) member = message.guild.members.get(args[0]).user
        else if(message.mentions.members.first()) member = message.mentions.members.first().user 
        else member = message.member.user
        let xp = JSON.parse(fs.readFileSync(__dirname+'/../../data/xp.json'))
        var usrlevel
        var usrxp
        var usrlevelpercent
        if(!xp[member.id]){
            usrlevel = 1
            usrxp = 0
            usrlevelpercent = "0%"
        } else {
            usrlevel = xp[member.id].level
            usrxp = xp[member.id].xp
            usrlevelpercent = levelPercent(xp[member.id].level,xp[member.id].xp) + "%"
        }
        const embed = {
            "color": 4803071,
            "author": {
              "name": member.tag,
              "icon_url": member.avatarURL
            },
            "fields": [
              {
                "name": "XP",
                "value": usrxp,
                "inline": true
              },
              {
                "name": "Level",
                "value": usrlevel,
                "inline": true
              },
              {
                "name": "Level Completion",
                "value": usrlevelpercent,
                "inline": true
              }
            ]
          };

          message.channel.send({embed:embed})
    },
  };

var levelXP = (level) => {
    return ((level**2)*10)
}

var nextLevelXP = (level) => {
    return levelXP(level)-levelXP(level-1)
}

var levelPercent = (level,xp) => {
    return Math.ceil(((xp-levelXP(level-1))/nextLevelXP(level))*100)
}
  