const botConfig = require('./config/botConfig.json');
const commands = require('./commands.js');
//const googleDrive = require('./fileHandling.js');

const Discord = require('discord.js')


const bot = new Discord.Client()

//googleDrive.ListFiles();

bot.on('ready', async () => {
    console.log("Connected as " + bot.user.tag)
    bot.user.setActivity("porn", { type: "WATCHING" })

})


bot.on('message', async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botConfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === prefix + "hello") {
        return message.channel.send("Dobrej den!");
    }

    if (cmd === `${prefix}addEmbed`) {
      commands.addEmbed(message, args);
    }

    if (cmd === `${prefix}minecraft`) {
      commands.addRole(message, '583972909542932487');
    }

});



bot.login(botConfig.token)
