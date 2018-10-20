var WebSocketClient = require('websocket').client;
const Discord = require("discord.js");
const Dclient = new Discord.Client();
const swag = require("eve-swagger");
const settings = require("./settings.json");
const file = require('file-system');
const fs = require('fs');
const fetch = require('node-fetch');
const mysql = require('mysql');

var client = new WebSocketClient();
Dclient.login(settings.private.nsh);

let esi = swag({
  service: 'https://esi.tech.ccp.is',
  source: 'tranquility',
  agent: 'eve-swagger | https://github.com/lhkbob/eve-swagger-js',
  language: 'en-us',
  timeout: 6000,
  minTime: 0,
  maxConcurrent: 0
});
const con = mysql.createConnection({
  host: 'localhost',
  user: settings.mysql.user,
  password: settings.mysql.password,
  database: settings.mysql.database
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to Eve_SDE!");
});

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  console.log('Listening to Zkill Websocket!');
  // Dclient.guilds.get("301524271912452096").channels.get("302284093150986240").send("Connected...");
  //
  connection.on('error', function(error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function(reasonCode, description) {
    console.log(reasonCode + " | " + description);
    console.log('echo-protocol Connection Closed');
    // Dclient.guilds.get("301524271912452096").channels.get("302284093150986240").send("Socket Closed...Reconnecting...");
    setTimeout(function reconnect() {
      client.connect('wss://zkillboard.com:2096');
    }, 3000);
  });
  connection.on('message', function(message) {
    //console.log("Got Data");
    var response = JSON.parse(message.utf8Data);
    //console.log(response);
    let km = [];
    let attackers = response.attackers;
    let shipNames = {
      "victim": [],
      "attackers": []
    };
    let systemFrom = {
      "x": -325480783451587300,
      "y": 38677203174959330,
      "z": 104825862277448660
    };
    //console.log(response);
    let systemTo = fetch("https://esi.evetech.net/latest/universe/systems/" + response.solar_system_id + "/?datasource=tranquility&language=en-us")
      .then(res => res.json())
      .then(stats => {
        let systemPos = stats.position;
        return systemPos
      }).then((systemTo) => {
        var kmStatBuild = new Promise(async (resolve, reject) => {
          function calcDistanceinLightyears(systemFrom, systemTo) {
            var x1 = systemFrom.x;
            var y1 = systemFrom.y;
            var z1 = systemFrom.z;
            var x2 = systemTo.x;
            var y2 = systemTo.y;
            var z2 = systemTo.z;
            return Math.ceil(Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) +
              Math.pow((z1 - z2), 2)) / 9460000000000000);
          }
          let victimInfo = await swag.characters(response.victim.character_id).info();
           // console.log(victimInfo);
          let corpInfo = await swag.corporations(victimInfo.corporation_id).info();
           // console.log(corpInfo);
          
          if (victimInfo.alliance_id){
            
            var allianceInfo = await swag.alliances(victimInfo.alliance_id).info()||NULL; 
            var allianceName = allianceInfo.alliance_name||NULL;
            var aTicker = allianceInfo.ticker||NULL;
            
          } else {
            
            var allianceInfo = "None"; 
            var allianceName = "None";
            var aTicker = "None";
          }
        
            
          
          
          
          shipNames.victim.push({
            "name": victimInfo.name,
            "charID": response.victim.character_id,
            "corp": corpInfo.corporation_name,
            "corpTicker": corpInfo.ticker,
            "alliance": allianceName,
            "allianceTicker": aTicker
            
            
            
          });
          //console.log(shipNames.victim[0]);
          for (a = 0; a < attackers.length; a++) {
            let charID = attackers[a].character_id;
            let url = response.zkb.url;
            let locationName = [];
            let location = con.query('SELECT * from mapSolarSystems where solarSystemID =' + response.solar_system_id + '', (err, result) => {
              if (err) throw err;
              locationName.push(result[0].solarSystemName);
            });
            if (typeof attackers[a].ship_type_id != 'undefined' && typeof charID != 'undefined') {
              con.query('SELECT * from invTypes where typeID =' + attackers[a].ship_type_id + '', (err, result) => {
                if (err) throw err;

                let attacker = attackers[a];
                if (result[0].typeName && result[0].typeName != 'undefined' && result[0].typeName !== '0') {
                  shipNames.attackers.push({
                    "shipName": result[0].typeName,
                    "shipID": result[0].typeID,
                    "distance": calcDistanceinLightyears(systemFrom, systemTo),
                    "characterID": charID,
                    "zkb": url,
                    "location": locationName[0]

                  });
                  if (shipNames.attackers.length === attackers.length && response.zkb.totalValue > 50000000) {
                   // console.log(shipNames);
                    resolve(shipNames);
                  }
                }
                if (err) throw err;
              });
            }
          }
        });
        kmStatBuild.then(() => {
          console.log("PROMISE FOUDNDDDDDDDDDD");
          let caps = [23757, 23911, 24483, 23915, 19722, 19720, 19724, 19726, 37604, 37607, 37605, 37606, 23913, 23919, 22852, 23917, 23773, 3764, 11567, 671, 42126, 45649];
          let match = [];
          let names = [];
         console.log(shipNames.attackers[0].distance);
          if (shipNames.attackers.length > 0 && shipNames.attackers[0].distance < 9) {
            console.log("----------------------------------" + shipNames.attackers[0].location[0] + "----------------------------------" );
            for (s = 0; s < shipNames.attackers.length; s++) {
              // console.log(shipNames.attackers.length);
              for (c = 0; c < caps.length; c++) {
                if (c === 21 && match.length === 0) {
                  let embed = new Discord.RichEmbed()
                    .setThumbnail('https://media.discordapp.net/attachments/200446934412951563/497972001185595393/nshlogosquish.png?width=410&height=406')
                    .setColor("#f45042")
                    .setTitle("Subcap Activity in **" + shipNames.attackers[0].location + "**:  " + shipNames.attackers[0].zkb)
                    .addField("Distance: ", shipNames.attackers[0].distance + "LY", true)
                  .addField("Victim: ", shipNames.victim[0].name , true)
                  .addField("Corp: ", shipNames.victim[0].corp + " [" + shipNames.victim[0].corpTicker + "] "  , true)
                  if (shipNames.victim[0].alliance != "None"){
                    embed.addField("Alliance: ", shipNames.victim[0].alliance + " [" + shipNames.victim[0].allianceTicker + "] "  , true)
                    
                  }
                    embed.addField("Pilot(s) Involved: ", shipNames.attackers.length, true);
                  if (shipNames.attackers.length >= 1) {
                    
                    shipNames.attackers.forEach(shipName => {
                      names.push(shipName.shipName);
                    })
                  }
                  if (names.length === shipNames.attackers.length) {
                    var uniqueNames = [...new Set(names)];
                      embed.addField("Ship(s) Involved: ", uniqueNames, true);
                      Dclient.guilds.get("497260345908264960").channels.get("498269278961795093").send(embed);
                      console.log("IDK WHY THIS SHIT IS POSTING TWICE");
                    }
                }
                if (shipNames.attackers[s].shipID === caps[c]) {
                  match.push('Match Found');
                  console.log(match);
                  if (match.length = 1) {
                    let embed = new Discord.RichEmbed()
                    .setThumbnail('https://media.discordapp.net/attachments/200446934412951563/497972001185595393/nshlogosquish.png?width=410&height=406')
                    .setColor("#f45042")
                    .setTitle("Capital Activity in Range:  " + shipNames.attackers[0].zkb)
                    .addField("Distance: ", shipNames.attackers[0].distance + " LY", true)
                  .addField("Pilot(s) Invloved: ", shipNames.attackers.length, true)
                  .addField("Cap Involved: ", shipNames.attackers[s].shipName, true);
                  Dclient.guilds.get("497260345908264960").channels.get("498269278961795093").send("ALARMAAA " + shipNames.attackers[0].zkb);
                  Dclient.guilds.get("497260345908264960").channels.get("498269278961795093").send(embed);
                  }
                  
                }
              }
            }

          }

        });
      });
  });

  function sendParams() {
    if (connection.connected) {
      var params = '{"action":"sub","channel":"killstream"}';
      connection.sendUTF(params.toString());
      setTimeout(sendParams, 1000);
    }
  }
  sendParams();
});

client.connect('wss://zkillboard.com:2096');