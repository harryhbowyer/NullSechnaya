const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const swag = require("eve-swagger");
const prefix = settings.prefix;
const snekfetch = require("snekfetch");
const mysql = require('mysql');
client.login(settings.private.nsh);

const connection = mysql.createConnection({
  host: 'localhost',
  user: settings.mysql.user,
  password: settings.mysql.password,
  database: settings.mysql.database
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to Eve_SDE!");
});
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
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.content.startsWith(prefix)) return;
  var messageSanitized = message.content.toLowerCase();
  var command = message.content.startsWith(prefix + 'hit');
  var systems = messageSanitized.replace(`${prefix}hit `, '');
  var sArray = systems.split(" ");

let systemobj = [];
  
if (sArray.length === 2 && command === true){
  var systemPromise = new Promise((resolve, reject) => {
              
                connection.query('SELECT * from mapSolarSystems where solarSystemName like ' + "'%" + sArray[0] + "%'", (err, result) => {
                  //shipNames.push(result[0].typeName);
                  if (err) throw err;
                  if (result) {
                    console.log(result[0].x)
                    systemobj.push({
                      "from": {
                      "x": result[0].x,
                      "y": result[0].y,
                      "z": result[0].z,
                        "name": result[0].solarSystemName
                      }
                    })
                  }
                })
                connection.query('SELECT * from mapSolarSystems where solarSystemName like ' + "'%" + sArray[1] + "%'", (err, result) => {
                  //shipNames.push(result[0].typeName);
                  if (err) throw err;
                  if (result) {
                    console.log(result[0].x)
                    systemobj.push({ 
                    "to" : {
                      "x": result[0].x,
                      "y": result[0].y,
                      "z": result[0].z,
                      "name": result[0].solarSystemName
                      }
                    })
                  }
                  console.log(systemobj.length);
    console.log(systemobj);
              if (systemobj.length === 2){
                
                resolve(systemobj);
              }
                })
    
            });


//   var systemFromID = await swag.solarSystems.search(sArray[0]);
//   var systemToID = await swag.solarSystems.search(sArray[1]);
//   if (typeof systemToID === 'undefined' || typeof systemFromID === 'undefined'){

//     if (typeof systemToID === 'undefined'){

//       message.reply(sArray[1] + " is not a valid Solar System! Please review and correct.");

//     }

//     if (typeof systemFromID === 'undefined'){

//       message.reply(sArray[0] + " is not a valid Solar System! Please review and correct.");

//     }


//   } else 
  systemPromise.then((systemobj) => {
    var systemFrom = systemobj[0].from;
    var systemTo = systemobj[1].to;
     if (systemobj.length === 2) {

    function calcDistanceinLightyears(systemFrom, systemTo) {
      var x1 = systemFrom.x;
      var y1 = systemFrom.y;
      var z1 = systemFrom.z;
      var x2 = systemTo.x;
      var y2 = systemTo.y;
      var z2 = systemTo.z;
      return Math.ceil(Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) +
      Math.pow((z1-z2), 2) ) / 9460000000000000);
    }

    const dotlan = "http://evemaps.dotlan.net/jump/"
    var supers = dotlan + "Nyx,544/" + systemFrom.name + ":" + systemTo.name;
    var cap = dotlan + "Archon,544/" + systemFrom.name + ":" + systemTo.name;
    var blops = dotlan + "Panther,544/" + systemFrom.name + ":" + systemTo.name;
    var rorq = dotlan + "Rorqual,544/" + systemFrom.name + ":" + systemTo.name;
    var jf = dotlan + "Nomad,544/" + systemFrom.name + ":" + systemTo.name;


    let embed = new Discord.RichEmbed()
    embed.setColor("#f45042")
    if (calcDistanceinLightyears(systemFrom, systemTo) <= 6){


      embed.addField("Jump Distance from " + systemFrom.name + " to " + systemTo.name + " rounded to (" + calcDistanceinLightyears(systemFrom, systemTo) + "LY)", "[Supers/Titans](" + supers + ") \n[Carriers/Fax/Dreads](" + cap + ") \n[BLOPS](" + blops +") \n[Rorquals](" + rorq + ") \n[Jump Freighters](" + jf + ")")
     


    } else if (calcDistanceinLightyears(systemFrom, systemTo) <= 7){

      embed.addField("Jump Distance from " + systemFrom.name + " to " + systemTo.name + " rounded to (" + calcDistanceinLightyears(systemFrom, systemTo) + "LY)", "[Carriers/Fax/Dreads](" + cap + ") \n[BLOPS](" + blops +") \n[Rorquals](" + rorq + ") \n[Jump Freighters](" + jf + ")")
      
      

    } else if (calcDistanceinLightyears(systemFrom, systemTo) <= 8){

      embed.addField("Jump Distance from " + systemFrom.name + " to " + systemTo.name + " rounded to (" + calcDistanceinLightyears(systemFrom, systemTo) + "LY)", "[BLOPS](" + blops +") \n[Rorquals](" + rorq + ") \n[Jump Freighters](" + jf + ")")
      
      

    } else if (calcDistanceinLightyears(systemFrom, systemTo) <= 10){

      embed.addField("Jump Distance from " + systemFrom.name + " to " + systemTo.name + " rounded to (" + calcDistanceinLightyears(systemFrom, systemTo) + "LY)", "[Rorquals](" + rorq + ") \n[Jump Freighters](" + jf + ")")
     
      

    } else if (calcDistanceinLightyears(systemFrom, systemTo) > 10){

      embed.addField("Distance is greater than 10 LY!", "Distance rounded to (" + calcDistanceinLightyears(systemFrom, systemTo) + "LY)")

    }

   message.channel.send(embed);








  } else if (systemFrom.length > 1 || systemTo.length > 1) {

    if (systemFrom.length > 1){
      var fromArray = [];
    var flen = systemFrom.length;
      for (var f = 0;  f < flen; f++) {
        var sfID = systemFrom[f];
        var fromName = sfID.name;
      fromArray.push(fromName);
      }

  message.reply("Did you mean " + fromArray.join(" - ") + "?")
    }


    if (systemToID.length > 1){
      var toArray = [];
      var tlen = systemToID.length;
      for (var t = 0; t < tlen; t++) {
        var stID = systemTo[t];
        var toName = stID.name;
      toArray.push(toName);
    }


    message.reply("Did you mean " + toArray.join(" - ") + "?")
    }


  }





}) 
  
if (sArray.length > 2 && command === true) {

var multiSystem = (sArray.map(a => a.toUpperCase()));

message.reply("Command returned more than one unique system as either the From or To system. Systems returned were: " + multiSystem.join(", ") );

} else if (sArray.length < 2 && command === true) {


message.reply("Command requires <to> <from> format.");

}

    
    
    
    
  }
    
   



  });
