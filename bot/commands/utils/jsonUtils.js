const fs = require("fs");

module.exports.loadJson = function (filePath) {
    const fileString = fs.readFileSync(filePath, "utf8");
    const result = JSON.parse(fileString);
    return result;
}

module.exports.saveJson = function (filePath, data) {
    fs.writeFile(filePath, data, err => {
        if (err) {
            throw err;
        }
    });
}

module.exports.formatUptime = function (botUptime) {
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