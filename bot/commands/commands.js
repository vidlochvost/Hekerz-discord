const Discord = require('discord.js')
const bank = require('./bank')
const utils = require('./utils/jsonUtils')

const nostra = require('./jsonData/nostra.json')

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
  } else {
    guildMember.addRole(roleId);
  }
};

module.exports.uptime = function (message, botUptime) {
  message.channel.send(`Jsem online už ${utils.formatUptime(botUptime)}.`);
};

module.exports.kill = function (message, bot) {
  message.channel.send(`Byl jsem online ${utils.formatUptime(bot.uptime)} a niní je čas abych šel.`);
  bot.destroy();
};

module.exports.roll = function (message, commandChannel) {
  let roll = Math.floor(Math.random() * 101);
  const author = message.author;
  let result = `<@${author.id}> hodil ${roll}.`;
  commandChannel.send(result);
  if (result === 100) {
    bank.giveCoins(message.author, 100);
    commandChannel.send(`@everyone Jackpot, +100 coins pro <@${author.id}>`);
  }
}

module.exports.nostra = function (message) {
  let pizza = nostra.pizzas[Math.floor(Math.random() * nostra.pizzas.length - 1)];
  let result = ` bude obědvat ${pizza}, dobrou chuť.`;
  message.reply(result);
}