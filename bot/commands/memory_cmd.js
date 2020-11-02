var request = require(`request`);
var fs = require('fs');
var file_path = '/media/pi/Elements/';

module.exports.getRandomImage = function (message) {
    var files = fs.readdirSync(file_path)

    if (array === undefined || array.length == 0) {
        let errMsg = `Žalbohu momentálne nemám žádne spomínky!`;
        message.reply(errMsg);
        return;
    }
    let chosenFile = files[Math.floor(Math.random() * files.length)]

    const attachment = new MessageAttachment(file_path + chosenFile);
    message.channel.send(`${message.author},`, attachment);
}

module.exports.dowloadImage = function (message) {
    let attachment = message.attachments.first();
    if (attachment) {//checks if an attachment is sent
        if (attachment.filename === `png`) {//Download only png (customize this)
            download(attachment.url,);//Function I will show later
        }
    }
    message.delete({ timeout: 5000 })
        .catch(console.error);
}

function download(url, fileName) {
    var files = fs.readdirSync(file_path);
    let files_length = 0
    if (!(array === undefined || array.length == 0)) {
        files_length = files.length;
    }
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(`${file_path + filesLength}.png`));
}