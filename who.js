const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const swag = require("eve-swagger");
const prefix = settings.prefix;
const fetch = require('node-fetch');
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
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  var messageSanitized = message.content.toLowerCase();
  var toon = messageSanitized.replace(`${prefix}who `, '');
  const evewho = "https://evewho.com/pilot/";
  const zkill = "https://zkillboard.com/character/";
  const zkillStatsCharacter = "https://zkillboard.com/api/stats/characterID/";
  const zkillLosses = "https://zkillboard.com/api/characterID/";
  //Collect Data on the Toon Name provided by the User and set variables/constants.
  var cid = await swag.characters.search.strict(toon);
  if (cid) {
    var characterImage = await swag.characters(cid).portrait();
    var characterInfo = await swag.characters(cid).info();
    var corpName = await swag.corporations(characterInfo.corporation_id).info();
    const api = zkillStatsCharacter + cid + "/";
    const losses = zkillLosses + cid + "/losses/"
    //var shipSearch = await swag.types('42241').info();
    //Data to include in Rich Embed that will always be there, given the name provided is correct.
    if (messageSanitized.startsWith(prefix + 'who') && messageSanitized !== '!who') {
      let embed = new Discord.RichEmbed()
        .setThumbnail(characterImage.px128x128)
        .setColor("#f45042")
        .setTitle("Results for: " + characterInfo.name)
        .addField("Corporation: ", corpName.corporation_name, true);
      //If toon is in an Alliance, provide Alliance Name
      if (characterInfo.alliance_id) {
        var allianceName = await swag.alliances(characterInfo.alliance_id).info();
        embed.addField('Alliance: ', allianceName.alliance_name, true);
      }
      //Zkill and Evewho of the toon.
      embed.addField("EveWho: ", evewho + encodeURI(toon))
      embed.addField("Zkill: ", zkill + cid + "/")
      embed.setFooter("Note: Toons with no kill/loss history will not have a valid zkill link.");
      //Function to compare two arrays for matching items and return the matching items in an array.
      function getMatch(a, b) {
        var matches = [];
        for (var i = 0; i < a.length; i++) {
          for (var e = 0; e < b.length; e++) {
            if (a[i] === b[e]) matches.push(a[i]);
          }
        }
        return matches;
      }
      //
      let cynoLosses = [];
      var cynoCheck = new Promise((resolve, reject) => {
        fetch(losses)
          .then(lossr => lossr.json())
          .then(loss => {
          console.log(loss);
            loop1: for (var c = 0; c < loss.length; c++) {
              var item = loss[c].victim.items;
              loop2:
                for (var items = 0; items < item.length; items++) {
                  if (item[items].item_type_id === 21096) {
                    cynoLosses.push(loss[c].killmail_id);
                    if (cynoLosses.length >= 1) {
                      
                      console.log(cynoLosses);
                      resolve();
                      break loop1;
                    }
                  }
                }
            }
          });
      });
      //Main Fetch to pull data from toons zkill for Top Ships.
      fetch(api)
        .then(res => res.json())
        .then(stats => {
          if (stats.topAllTime !== null && stats.topAllTime) {
            let body = stats;
            let shipIDs = [];
            let ShipNames = [];
            var sArray = ["Hel", "Aeon", "Wyvern", "Nyx", "Vendetta", "Revenant", "Avatar", "Erebus", "Leviathan", "Ragnarok", "Molok", "Vanquisher", "Komodo"]
            var cArray = ["Apostle", "Lif", "Ninazu", "Minokawa", "Chimera", "Archon", "Thanatos", "Nidhoggur", "Moros", "Phoenix", "Naglfar", "Revelation", "Vehement"]
            var topShips = body.topAllTime[4].data;
            topShips.forEach(function(ship) {
              shipIDs.push(ship.shipTypeID);
            });
            let shipNames = [];
            /*Promise to return Top Ships, Caps, and Supers Flown!!
            Will refactor further to streamline and improve the process
            in the future.
            */
            var shipPromise = new Promise((resolve, reject) => {
              shipIDs.forEach(shipID => {
                connection.query('SELECT typeName from invTypes where typeID =' + shipID + '', (err, result) => {
                  shipNames.push(result[0].typeName);
                  if (err) throw err;
                  if (shipNames.length === shipIDs.length) {
                    resolve();
                  }
                })
              });
            });
            cynoCheck.then(() => {
              if (cynoLosses.length > 0) {
                var lossMail = "https://zkillboard.com/kill/" + cynoLosses[0] + "/";
                message.reply("Potential Cyno. Here is the LossMail: " + lossMail);
                console.log(cynoLosses[0]);
                //embed.addField("POTENTIAL CYNO:", lossMail, true);
              }
            });
            shipPromise.then(() => {
              var sMatch = getMatch(sArray, shipNames);
              var cMatch = getMatch(cArray, shipNames);
              if (shipNames.length != 0) {
                var topThree = shipNames;
                topThree.length = 3;
                embed.addField('*Ships*: ', topThree, true);
              }
              if (cMatch.length > 0) {
                embed.addField('*Caps Flown*: ', cMatch, true);
              }
              if (sMatch.length > 0) {
                embed.addField('*Supers Flown*: ', sMatch, true);
              }
              
              message.channel.send(embed);
            });
          } else {
            cynoCheck.then(() => {
              if (cynoLosses.length > 0) {
                var lossMail = "https://zkillboard.com/kill/" + cynoLosses[0] + "/";
                message.reply("Potential Cyno. Here is the LossMail: " + lossMail);
                console.log(cynoLosses[0]);
                //embed.addField("POTENTIAL CYNO:", lossMail, true);
              }
             message.channel.send(embed) 
            });
          }
        });
      //Simple checks on toon provided. Will need more to clarify if more than one character id is returned (Very Rare). Minor Improvement   
    } else if (messageSanitized.startsWith(prefix + 'who') && messageSanitized !== '~who') {
      message.reply('Cannot submit an empty request');
      return;
    }
  } else if (messageSanitized.startsWith(prefix + 'who') && messageSanitized !== '!who') {
    message.reply("No character listed by that name");
  }
});