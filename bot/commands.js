const Discord = require('discord.js')

module.exports.assemble = function (message, args) {

    const result = new Discord.RichEmbed()
        .setColor("GOLD")
        .setTitle("Rychle! A-Team assemble!")
        .setAuthor(message.author.username);

    result.setImage("http://surviv.io/img/surviv_logo_full.png");
    result.addField("Přidej se ke mně", "https://surviv.io/#" + args[0], false);

    message.channel.send(result);
    message.delete();
};

module.exports.addRole = function (message, roleId) {
  const guildMember = message.member;
  if (guildMember.roles.has(roleId)) {
    guildMember.removeRole(roleId);
    message.channel.send(`Používatel ${message.author.username} byl odebrán z role.`);
  } else {
    guildMember.addRole(roleId);
    message.channel.send(`Používatel ${message.author.username} byl přidán do role.`);
  }
};

module.exports.uptime = function (message, botUptime) {
  message.channel.send(`Jsem online už ${formatUptime(botUptime)}.`);
};

module.exports.kill = function (message, bot) {
  message.channel.send(`Byl jsem online ${formatUptime(bot.uptime)} a niní je čas umžít.`);
  bot.destroy();
};

function formatUptime(botUptime) {
  var totalSeconds = (botUptime / 1000);
  var days = Math.floor(totalSeconds / 86400);
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  return `${days} dní, ${hours} hodin, ${minutes} minut`;
}
