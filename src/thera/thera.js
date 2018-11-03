const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const swag = require("eve-swagger");
const prefix = settings.prefix;
const snekfetch = require("snekfetch");
const file = require('file-system');
const fs = require('fs');

client.login(settings.private.nsh);


let esi = swag({
  service: 'https://esi.tech.ccp.is',
  source: 'tranquility',
  agent: 'eve-swagger | https://github.com/lhkbob/eve-swagger-js',
  language: 'en-us',
  timeout: 6000,
  minTime: 0,
  maxConcurrent: 0
});


client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  var messageSanitized = message.content.toLowerCase();
  var command = message.content.startsWith(prefix + 'thera');
  var systemGiven = messageSanitized.replace(`${prefix}thera`, '');
  var systemID = await swag.solarSystems.search(systemGiven);
  var systemInfo = await swag.names(systemID);
  const wormholes = 'https://www.eve-scout.com/api/wormholes';
  if (typeof systemID != 'undefined' && command === true) {
  message.reply("Collecting data from Eve Scout...");
    let theraEntrances = [];
    snekfetch.get(wormholes).then(async l => {
      //console.log(l.body);
      for (var i = 0; i < l.body.length; i++) {
        var destoSystem = l.body[i].destinationSolarSystem;
        if (destoSystem.security === -0.99) {
          console.log('This is a wormhole!');
        } else {
         
          var distance = await swag.solarSystems(systemID).shortestRoute(destoSystem.id);
          var jumpsFrom = distance.length - 1;
          theraEntrances.push({
            id: destoSystem.id,
            name: destoSystem.name,
            jumps: jumpsFrom,
            region_id: destoSystem.region.id,
            region_name: destoSystem.region.name,
            outsig: l.body[i].signatureId,
            insig: l.body[i].wormholeDestinationSignatureId

          });
          //console.log(distance);
        }

        // embed.addField(obj.hunters[h].name, "Piloting: " + obj.hunters[h].ship + "\nSystem: " + obj.hunters[h].system + "\nJumps: " + jumpsFrom);

      }

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const jumpsA = a.jumps;
        const jumpsB = b.jumps;

        let comparison = 0;
        if (jumpsA > jumpsB) {
          comparison = 1;
        } else if (jumpsA < jumpsB) {
          comparison = -1;
        }
        return comparison;
      }

      theraEntrances.sort(compare);
      console.log(theraEntrances);
      let embed = new Discord.RichEmbed()
      embed.setColor("#f45042")
      embed.setTitle("Closest Thera entrance from " + systemInfo[0].name + ":")
      //for (j = 0; j < theraEntrances.length; j++){
        
        
        embed.addField(theraEntrances[0].name, "Region: " + theraEntrances[0].region_name + "\nJumps: " + theraEntrances[0].jumps + '\nFrom Thera Sig: ' + theraEntrances[0].insig + '\nTo Thera Sig: ' + theraEntrances[0].outsig);
     // }
      message.channel.send(embed);
    }).catch(err => {
      console.log(err);
    });



  }





});