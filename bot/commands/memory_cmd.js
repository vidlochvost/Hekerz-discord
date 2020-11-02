var fs = require('fs');
const fetch = require('node-fetch');
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
    message.reply('JJJ');
    let attachment = message.attachments.first();
    if (attachment) {//checks if an attachment is sent
        message.reply(attachment.filename);
        if (attachment.filename === `png`) {//Download only png (customize this)
            message.reply(attachment.url);
            download(attachment.url);//Function I will show later
        }
    }
    message.delete({ timeout: 5000 })
        .catch(console.error);
}

function download(url) {
    const response = fetch(url);
    const buffer = response.buffer();
    fs.writeFile(getNewFilePath(), buffer, () =>
        message.reply('finished downloading!'));
}

function getNewFilePath() {
    var files = fs.readdirSync(filePath);
    let filesLength = 0
    if (!(array === undefined || array.length == 0)) {
        filesLength = files.length;
    }

    return `${filePath + filesLength}.png`;
}