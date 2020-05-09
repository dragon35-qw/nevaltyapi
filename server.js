const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const ayarlar = require("./ayarlar.json")
require("./util/eventLoader")(client)
// 7-24 Aktiflik İçin
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
console.log(`BOT'unuz [--] AŞ | ☬  GAMER#4282[--] Adlı Kullanıcı Tarafından Hostlandı Yani 7/24 Aktif Edildi. ( Teşekküre Gerek Yok 😊 ) `)
response.sendStatus(200)
})
app.listen(process.env.PORT)
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)
const log = message => {
  console.log(`[ »» ] ${message}`)
};

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err)
  log(`${files.length} Komut Yüklenecek.`)
  files.forEach(f => {
    let props = require(`./komutlar/${f}`)
    log(`Yüklenen Komut: ${props.help.name}.`)
    client.commands.set(props.help.name, props)
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    })
  })
})

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]
      let cmd = require(`./komutlar/${command}`)
      client.commands.delete(command)
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias)
      })
      client.commands.set(command, cmd)
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name)
      })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`)
      client.commands.set(command, cmd)
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]
      let cmd = require(`./komutlar/${command}`)
      client.commands.delete(command)
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ // Komutlar Burdan Aşşa \\ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \\
/////////////////////////ÖZEL KOMUT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
client.on("message", async message => {
  if (message.channel.type === "dm" || !message.content.startsWith(ayarlar.prefix)) return;
  let ozelkomutlar = db.get(`ozelkomut.${message.guild.id}`);
  if (!ozelkomutlar || ozelkomutlar.length == 0) return;
  let komut = message.content.slice(ayarlar.prefix.length);
  // !test test
  let ozelKomut = ozelkomutlar.find(a => a.isim === komut);
  if (!ozelKomut) return;
  else {
    message.channel.send(ozelKomut.cevap);
  };
});
////////////////////////////////////////////////////////////////////
//////////////////////// SEVİYE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");

  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 7) {
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
  }

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);

    msg.channel.send(
      `Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(
        `seviye_${msg.author.id + msg.guild.id}`
      )}** seviye oldun!`
    );

    db.delete(`puancik_${msg.author.id + msg.guild.id}`);
  }
});

/////////////////////////////////////////////////////////////
//////////////////// RESİMLİ GÜVENLİK \\\\\\\\\\\\\\\\\\\\\\\
client.on('guildMemberAdd',async member => {
 let user = client.users.get(member.id);
 let id = await db.fetch(`guvenlik${member.guild.id}`);
 let kanal = member.guild.channels.find('id', id)
 let isim = member.displayName.length > 30 ? member.displayName.substring(0, 17) + '...' : member.displayName;
 
 const { loadImage } = require('canvas');
 const { Canvas } = require('canvas-constructor');
 const { get } = require('node-superfetch');
  
  const { body: şüpheli } = await get('https://cdn.discordapp.com/attachments/643157527562813460/675811793896996875/Adsz.png');
    const { body: güvenli } = await get('https://cdn.discordapp.com/attachments/643157527562813460/675811131004026931/Adsz.png');
  const avatar = await loadImage(member.user.displayAvatarURL);

  const tarih = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(tarih).format("D"); 
  
   var inceleme;
    if (tarih > 2629800000) inceleme = güvenli
    if (tarih < 2629800000) inceleme = şüpheli
  
    const resimler = new Canvas(400, 180)
        .addImage(inceleme, 0,0, 400, 180)
      .addCircularImage(avatar, 85, 90, 64)
      .setTextAlign('center')
      .setTextFont('18pt Klavika Regular')
      .setColor('#FFFFFF')
      .addText(isim, 285, 54)
      .setTextAlign('left')
      .toBuffer();
   
  let embed = new RichEmbed() 
      .setColor("GREEN") 
      .setAuthor(`${user.tag}`, user.displayAvatarURL)
      .attachFile({attachment: resimler, name: 'stark-guvenlik.png'})
      .setImage('attachment://stark-guvenlik.png') 
    
  kanal.send(embed);  
});
///////////////////////////////////////////////////////////
//////////////////// AFK MODU \\\\\\\\\\\\\\\\\\\\\\\
const ms = require("parse-ms");
client.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply("Başarıyla afk modundan çıktınız.");
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    message.channel.send(`${USER.tag} kullanıcısı AFK\n AFK süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s\nSebep:\n **${REASON}**` )
  }
});const db = require("quick.db")

exports.run = function(client, message, args) {

  var USER = message.author;
  var REASON = args.slice(0).join("  ");
  if(!REASON) return message.channel.send("AFK olmak için bir sebep belirtin.");
  
  db.set(`afk_${USER.id}`, REASON);
  db.set(`afk_süre_${USER.id}`, Date.now());
  message.channel.send("Başarıyla afk moduna girdiniz.")
  
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'afk', 
  description: 'Kullanıcııyı afk moduna sokar.',
  usage: 'afk <sebep>'
};
//////////////////////////////////////////////////
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ // Komutlar Bitti \\ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \\
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token)