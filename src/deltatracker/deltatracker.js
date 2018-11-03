const addClientListener = require('../common/discordclient');
const parser = require("./deltatrackerCommandParser");
const processor = require("./deltatrackerProcessor");
const fs = require("./deltatrackerFS");

addClientListener(async message => {
  const command = parser(message);
  const delta = processor(command);
  const filename = fs(delta);
  message.channel.sendFile(fileName);
});
