const botConfig = require('./config/botConfig.json');
const commands = require('./commands/commands');

const Discord = require('discord.js')

const bot = new Discord.Client()

bot.on('ready', () => {
  console.log("Connected as " + bot.user.tag)
  bot.user.setActivity("Among Us 2", { type: "PLAYING" })
})


bot.on('message', message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botConfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `help`) {
      return message.channel.send(`Prikazy jsou:` +
                                  `\n\t${prefix}hello` +
                                  `\n\t${prefix}uptime`);
    }

    if (cmd === `${prefix}hello`) {
      return message.reply("dobrej den!");
    }

    if (cmd === `${prefix}uptime`) {
      commands.uptime(message, bot.uptime);
    }

    if (cmd === `${prefix}nostra`) {
      commands.nostra(message);
    }

    if (cmd === `${prefix}kill` && message.member.hasPermission('ADMINISTRATOR')) {
      commands.kill(message, bot);
    }

});



bot.login(botConfig.token)
