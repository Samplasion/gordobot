module.exports.do = (message) => {
    let xpchance = Math.floor(Math.random()*4)
    if(xpchance==2){
        let xp = JSON.parse(fs.readFileSync(__dirname+'/../data/xp.json'))
        if(!xp[message.author.id]) xp[message.author.id] = {xp:1, level:1}
        else{
            xp[message.author.id].xp = xp[message.author.id].xp + Math.floor(Math.random()*4)+1
            if(xp[message.author.id].xp>=xp[message.author.id].level**2*10){
                xp[message.author.id].level = xp[message.author.id].level+1
                message.reply(`you are now level ${xp[message.author.id].level}!`).then(msg => msg.delete(5000))

                if(xp[message.author.id].level==5) message.member.addRole('606101167080210435', 'BOT - ROLE ON LEVEL')
                else if(xp[message.author.id].level==10) message.member.addRole('606102142176067584', 'BOT - ROLE ON LEVEL')
                else if(xp[message.author.id].level==20) message.member.addRole('606102426637959212', 'BOT - ROLE ON LEVEL')
            }
        }
        fs.writeFileSync(__dirname+'/../data/xp.json', JSON.stringify(xp));
    }
}