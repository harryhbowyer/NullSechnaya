const swag = require("eve-swagger");
const snekfetch = require("snekfetch");
const webshot = require('webshot');
const addClientListener = require('../common/discordclient');
const settings = require("../../config/settings.json");
const prefix = settings.prefix;

addClientListener(async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.content.startsWith(prefix)) return;
  var messageSanitized = message.content.toLowerCase();
  var command = message.content.startsWith(prefix + 'delta');
  const dotlan = 'http://evemaps.dotlan.net/map/';
  const tag = '#npc_delta';
  var regionRaw = messageSanitized.replace(`${prefix}delta `, '');
  var regionFound = await swag.regions.search(regionRaw);
  var regionInfo =  await swag.regions(regionFound).info();

  console.log(regionFound);
  console.log(regionInfo.name.replace(` `, "_"));


  if (command) {



    const optionSelector = {
      captureSelector: '.clearfix',
      windowSize: { width: 1350
, height: 768 }
      , renderDelay: 1000

    };
    console.log(dotlan + regionInfo.name.replace(` `, "_") + tag);
    var delta = (dotlan + regionInfo.name.replace(` `, "_") + tag);
    var rando = Math.random();
    webshot(delta, './deltaoutput/' + rando + 'delta.png', optionSelector, function(err) {

      if (err) {
        console.log(err);
      }

      console.log('Screenshot Taken');
     // function sendMsg() {
        message.channel.sendFile("./deltaoutput/" + rando + "delta.png");

    //  }

     // setTimeout(sendMsg, 3000);
    });
  }

});
