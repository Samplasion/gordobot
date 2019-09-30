/* (c) Copyright 2019 Castyte
 * GNU GENERAL PUBLIC LICENSE
 * See LICENCE file or <https://www.gnu.org/licenses/gpl-3.0.txt>
*/ 

const fs = require('fs');

module.exports.initEH = (bot, dir) => {
    fs.readdir(__dirname+`/../${dir}/`, (err, files) => {
        if (err) return console.error;
        files.forEach(file => {
          if (!file.endsWith('.js')) return;
          const evt = require(__dirname+`/../events/${file}`);
          let evtName = file.split('.')[0];
          console.info(`Loaded event '${evtName}'`);
          bot.on(evtName, evt.bind(null, bot));
        });
    });
}