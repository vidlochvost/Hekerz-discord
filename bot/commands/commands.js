const Discord = require('discord.js')
const utils = require('./utils/jsonUtils')
const memoryCmd = require('./memory_cmd')

const nostra = require('./jsonData/nostra.json')

module.exports.uptime = function (message, botUptime) {
  message.channel.send(`Jsem online už ${utils.formatUptime(botUptime)}.`);
};

module.exports.kill = function (message, bot) {
  message.channel.send(`Byl jsem online ${utils.formatUptime(bot.uptime)} a niní je čas abych šel.`);
  bot.destroy();
};

module.exports.nostra = function (message) {
  let pizza = nostra.pizzas[Math.floor(Math.random() * nostra.pizzas.length - 1)];
  let result = ` bude obědvat ${pizza}, dobrou chuť.`;
  message.reply(result);
}

module.exports.memory = function (message) {
  memoryCmd.getRandomImage(message);
};

module.exports.remember = function (message) {
  memoryCmd.dowloadImage(message);
};