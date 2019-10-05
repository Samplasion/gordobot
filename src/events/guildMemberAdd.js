/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const captchagen = require('captchagen')
var Discord = require('discord.js')

module.exports = async (bot,member) => {
    if(bot.guilds.get('606091562774167562').channels.find(c => c.name==='raid-mode')){
        let captcha = await captchagen.create();
        await captcha.generate()
        const embed = new Discord.RichEmbed()
        .setTitle("iOS Jailbreak Captcha")
        .setDescription("We are currently experiencing difficulties with spam accounts.\nPlease complete the captcha below to be verified in iOS Jailbreak.\nJust send a message with the content of the image (case sensitive).")
        .setColor(4886754)
        .setFooter('For help contact castyte#7377')
        .setImage("attachment://captcha.jpeg")
        .attachFile({ attachment: captcha.stream('jpeg'), name: "captcha.jpeg" });
        member.send({embed}).then(msg => {
            msg.channel.awaitMessages(response => response.content, {
                max: 1,
                time: 30000,
                errors: ['time'],
            }).then((collected) => {
                if(collected.first().content===captcha.text()){
                    member.addRole('606098440916828170', 'BOT - ROLE ON JOIN (CAPTCHA MODE)');
                    msg.channel.send('Successfully verified!')
                } else {
                    msg.channel.send('**ERROR:** `captcha incorrect, leave and rejoin to retry`')
                }
            }).catch(() => {
                msg.channel.send('**ERROR:** `captcha timeout, leave and rejoin to retry`')
            })
        })
    } else {
        member.addRole('606098440916828170', 'BOT - ROLE ON JOIN');
    }
}