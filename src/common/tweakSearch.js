module.exports = (msg) => {
    let name = msg.content.split('[[')[1].split(']]')[0]
    if(!name) return;
    let data = await fetch(`https://castyte-aptview.glitch.me/n/${encodeURIComponent(name)}`, {headers: {'X-Token': process.env.TWEAKSEARCHTOKEN}}).then(checkStatus)
    if(data){
        let json = await data.json()
        if(json.Icon && !json.Icon.startsWith('http')) json.Icon = 'https://images-ext-2.discordapp.net/external/iB-NYAjFW_qlWIlyHSj3GTFYtSBPE9aYwLBWeNiPlZI/%3Fsize%3Dmedium%26hash%3D2/https/repo.packix.com/api/Packages/5d037766e9dbac001450114c/icon/download'
        const embed = {
            "title": "Tweak Info",
            "color": 255,
            "footer": {
              "text": `Initiated by ${msg.author.id}`
            },
            "thumbnail": {
              "url": json.Icon
            },
            "fields": [
              {
                "name": "Name",
                "value": (json.Name || 'unknown'),
                "inline": true
              },
              {
                "name": "Description",
                "value": (json.Description || 'unknown'),
                "inline": true
              },
              {
                "name": "Section",
                "value": (json.Section || 'unknown'),
                "inline": true
              },
              {
                "name": "Version",
                "value": (json.Version || 'unknown'),
                "inline": true
              },
              {
                "name": "Author",
                "value": (json.Author || 'unknown'),
                "inline": true
              },
              {
                "name": "Repo",
                "value": json._repoURL
              }
            ]
          };
          msg.channel.send({embed})
    } else {
        msg.reply('tweak not found')
    }
}