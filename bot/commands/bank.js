const utils = require('./utils/jsonUtils');

module.exports.coinBalance = function (message, commandChannel) {
    const author = message.author;

    const balance = giveCoins(author, 1);

    const result = `<@${author.id}> tvůj zůstatek na účtě je ${balance}.`;
    commandChannel.send(result);
};

function giveCoins(author, coinsNumber) {
    let balance = coinsNumber;
    const hekerz = utils.loadJson("commands/jsonData/hekerCoins.json");

    let heker = findHekerByUsername(author.id, hekerz);
    if (heker) {
        balance += heker.balance;
        heker.balance += coinsNumber;
    } else {
        let newAccount = { user: author.id, balance: coinsNumber };
        hekerz.push(newAccount);
    }

    const hekerzString = JSON.stringify(hekerz);
    utils.saveJson("commands/jsonData/hekerCoins.json", hekerzString);

    return balance;
}

function findHekerByUsername(id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].user == id) {
            return list[i];
        }
    }
    return null;
}

