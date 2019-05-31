const Discord = require('discord.js')

module.exports.addEmbed = function (message, args) {
  let title, color, description, footer;
  let field = [];

  console.log(args);

  for (i = 0; i < args.length; i++) {
    let argArray = args[i].split("¬");
    if (argArray[0] === "title") {
      title = argArray[1];
    }
    if (argArray[0] === "color") {
      color = argArray[1];
    }
    if (argArray[0] === "description") {
      description = argArray[1];
    }
    if (argArray[0] === "field") {
      field.push([argArray[1], argArray[2]]);
    }
    if (argArray[0] === "footer") {
      footer = argArray[1];
    }
  }

  const result = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setAuthor(message.author.username)
    .setDescription(description)
    .setFooter(footer);

  for (i = 0; i < field.length; i++) {
    result.addField(field[i][0], field[i][1]);
  }

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
