/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs')

module.exports = (bot,member) => {
    let xp = JSON.parse(fs.readFileSync(__dirname+'/../data/xp.json'))
    delete xp[member.id]
    fs.writeFileSync(__dirname+'/../data/xp.json', JSON.stringify(xp));
}