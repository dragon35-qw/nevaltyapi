const Discord = require('discord.js');


exports.run = (client, message, args) => {
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Komut giriişi').setDescription('Gerekli Dosyayı Kurmamı Onaylıyormusun ?').setFooter('Bu eylemi onaylıyorsan "Onaylıyorum" yazman yeterlidir.Bu eylem 30 saniye içinde sona erecek'))
.then(() => {
message.channel.awaitMessages(response => response.content === 'Onaylıyorum, onay', {
max: 1,
time: 30000,
errors: ['time'],
})
.then((collected) => {
        message.guild.createChannel(`「🚪」gelen-giden`);
        message.guild.createChannel(`「📃」kurallar`);
        message.guild.createChannel(`「💬」sohbet`);
        message.guild.createChannel(`「✅」sayaç`);
        message.guild.createChannel(`「🔨」bot-komut`);
        message.guild.createChannel(`「📢」duyuru`);
        message.guild.createChannel(`「🔰」partner`);
        message.guild.createChannel(`「🌐」mod-log`);
        message.guild.createChannel(`「🎉」çekiliş`);
        message.guild.createChannel(`「📷」görsel-içerik`);

        message.channel.send(`Gerekli Kanalları Oluşturdum.`);
    });
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'veletsunucukur',
  description: ' Küçük Bir Sunucu Kurar Optimium Code',
  usage: 'veletswkurar'
};