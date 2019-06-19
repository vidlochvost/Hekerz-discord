const botConfig = require('./config/botConfig.json');
const commands = require('./commands.js');

const Discord = require('discord.js')


const bot = new Discord.Client()


bot.on('ready', async () => {
    console.log("Connected as " + bot.user.tag)
    bot.user.setActivity("tetris", { type: "PLAYING" })

})


bot.on('message', async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botConfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `help`) {
        return message.channel.send(`Prikazy jsou:` +
                                    `\n\t${prefix}hello` +
                                    `\n\t${prefix}assemble <code>` +
                                    `\n\t${prefix}minecraft` +
                                    `\n\t${prefix}lolko`);
    }

    if (cmd === `${prefix}hello`) {
        return message.reply("dobrej den!");
    }

    if (cmd === `${prefix}assemble`) {
        commands.assemble(message, args);
    }

    if (cmd === `${prefix}minecraft`) {
        commands.addRole(message, '583972909542932487');
    }

    if (cmd === `${prefix}lolko`) {
        commands.addRole(message, '584333850247823371');
    }

    if (cmd === `${prefix}kill`) {
        bot.destroy();
    }

});



bot.login(botConfig.token)
