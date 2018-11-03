const addClientListener = require('../common/discordclient');
const parser = require("./deltatrackerCommandParser");
const processor = require("./deltatrackerProcessor");
const fs = require("./deltatrackerFS");

const command = process.argv.filter((a, i) => i > 1).join(" ");
if (!command) {
    console.error("Need command arguments");
    return;
}

const delta = processor(command);
console.log(delta);
