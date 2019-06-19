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
