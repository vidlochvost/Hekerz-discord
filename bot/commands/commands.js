const Discord = require('discord.js')
const fs = require('fs')

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
  message.channel.send(`Byl jsem online ${formatUptime(bot.uptime)} a niní je čas abych šel.`);
  bot.destroy();
};

function formatUptime(botUptime) {
  let totalSeconds = (botUptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);

  let result;
  if (hours === 0) {
    result = `${minutes} minut`;
  } else if (days === 0) {
    result = `${hours} hodin, ${minutes} minut`;
  } else {
    result = `${days} dní, ${hours} hodin, ${minutes} minut`;
  }
  return result;
}

module.exports.roll = function (message) {
  let roll = Math.floor(Math.random() * 101);
  const author = message.author;
  let result = `${author.username} hodil ${roll}.`;
  message.channel.send(result);
  if (result === 100) {
    giveCoins(message.author, 100);
    message.channel.send(`@everyone Jackpot, +100 coins pro @${author.username}#${author.discriminator}`);
  }
}

module.exports.nostra = function (message) {
  let pizza = nostra.pizzas[Math.floor(Math.random() * nostra.pizzas.length - 1)];
  let result = ` bude obědvat ${pizza}, dobrou chuť.`;
  message.reply(result);
}

module.exports.coinBalance = function (message) {
  const author = message.author;

  const balance = giveCoins(author, 1);

  let result = ` tvůj zůstatek na účtě je ${balance}.`;
  message.reply(result);
}

function loadJson(filePath) {
  const fileString = fs.readFileSync(filePath, 'utf8');
  const result = JSON.parse(fileString);
  return result;
}

function saveJson(filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      throw err;
    }
  });
}

function giveCoins(author, coinsNumber) {
  let balance;
  const username = `${author.username}#${author.discriminator}`;
  const hekerz = loadJson('commands/jsonData/hekerCoins.json');

  let heker = findHekerByUsername(username, hekerz);
  if (heker) {
    heker.balance += coinsNumber;
    balance = heker.balance;
  } else {
    let newAccount = {"user" : user, "balance" : coinsNumber};
    hekerz.push(newAccount);
    balance = coinsNumber;
  }

  const hekerzString = JSON.stringify(hekerz);
  saveJson('commands/jsonData/hekerCoins.json', hekerzString)

  return balance;
}

function findHekerByUsername(username, list) {
  for(var i = 0; i < list.length; i++) {
    if (list[i].username == username) {
        return list[i];
    }
  }
  return null;
}
