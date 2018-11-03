const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("../../config/settings.json");
let loggedIn = false;

module.exports = (fn) => {
    if (!loggedIn) {
        client.login(settings.private.nsh);
        loggedIn = true;
    }
    client.on("message", fn);
}
