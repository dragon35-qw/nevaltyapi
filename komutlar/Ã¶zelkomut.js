const { RichEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için yönetici iznine sahip olmalısın!');
  if(!args[0]) return message.reply('Bir işlem belirtmelisin! ekle/sil/liste')
  let ozelkomutlar = db.get(`ozelkomut.${message.guild.id}`);
  if (args[0] === "ekle") {
    args = args.slice(1).join(' ').split(' - ');
    let komutAdı = args[0];
    let verilecekCevap = args[1];
    if (!komutAdı || !verilecekCevap) return message.reply('Bir komut adı ve verilecek cevap belirt!');
    db.push(`ozelkomut.${message.guild.id}`, { isim: komutAdı, cevap: verilecekCevap });
    message.reply('Başarıyla özel komut oluşturuldu!');
  };
  
  if (args[0] === "sil") {
    let komutAdı = args.slice(1).join(' ');
    if (!komutAdı) return message.reply('Silinecek komutu belirtmelisin!');
    if (!ozelkomutlar) return message.reply('Zaten böyle bir özel komut yok!');
    if (ozelkomutlar && ozelkomutlar.every(x => x.isim != komutAdı)) return message.reply('Zaten böyle bir özel komut yok!');
    ozelkomutlar = ozelkomutlar.filter(a => a.isim != komutAdı);
    db.set(`ozelkomut.${message.guild.id}`, ozelkomutlar);
    message.reply('Başarıyla komut silindi!');
  };
  
  if (args[0] === "liste") {
    if (!ozelkomutlar || ozelkomutlar.length == 0) return message.reply('Listelenecek özel komut bulunamadı!');
    let liste = new RichEmbed().setTitle(message.guild.name + " Özel Komutlar").setDescription(`${ozelkomutlar.map(x => x.isim + ": " + x.cevap).join('\n')}`);
    message.channel.send(liste);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  permLevel: 0,
  aliases: []
};

exports.help = {
  name: "özelkomut",
  description: "özelkomut ekle [isim - cevap] / sil [isim] / liste",
  usage: "özelkomut"
};