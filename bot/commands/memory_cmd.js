var fs = require('fs');
const downloadImage = require('image-downloader')
const { MessageAttachment } = require('discord.js');

var filePath = '/media/pi/Elements/';

module.exports.getRandomImage = function (message) {
    var files = fs.readdirSync(filePath)

    if (files === undefined || files.length == 0) {
        let errMsg = `Žalbohu momentálne nemám žádne spomínky!`;
        message.reply(errMsg);
        return;
    }
    let chosenFile = files[Math.floor(Math.random() * files.length)]

    const attachment = new MessageAttachment(filePath + chosenFile);
    message.channel.send(`${message.author},`, attachment);
}

module.exports.dowloadImage = function (message) {
    let attachment = message.attachments.first();
    if (attachment) {//checks if an attachment is sent
        download(attachment.url, getNewFilePath());//Function I will show later
    }
    message.delete({ timeout: 5000 })
        .catch(console.error);
}

function download(url, finalPath) {
    const options = {
        url: url,
        dest: finalPath
    }

    downloadImage.image(options)
        .then(({ filename }) => {
            console.log('Saved to', filename)
        })
        .catch((err) => console.error(err))
}

function getNewFilePath() {
    var files = fs.readdirSync(filePath);
    let filesLength = 0
    if (!(files === undefined || files.length == 0)) {
        filesLength = files.length;
    }

    return `${filePath + filesLength}.png`;
}