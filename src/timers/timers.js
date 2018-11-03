const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const prefix = settings.prefix;
const moment = require('moment');
const file = require('file-system');
const fs = require('fs');

client.login(settings.private.nsh);


client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  var messageSanitized = message.content.toLowerCase();
  var command = message.content.startsWith(prefix + 'timer');
  var rawTimer = messageSanitized.replace(`${prefix}timer `, '');
  var timer = rawTimer.split(" ");
  if (command && timer.length >= 6) {
    function saveJson() {
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile('timers.json', json, 'utf8', function(err) {
        if (err) throw err;

        console.log('Timer Added!');
        message.reply('Timer Added!');
      });

    }
    var now = moment().toString();
    if (timer[1] === "poco" || timer[1] === "spos" || timer[1] === "mpos" || timer[1] === "lpos") {
      var ends = moment().add(timer[3], 'days').add(timer[4], 'hours').add(timer[5], 'minutes').toString();
      
    } else {
      var ends = moment().add(timer[4], 'days').add(timer[5], 'hours').add(timer[6], 'minutes').toString();
    }
    
    fs.readFile('timers.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data); //Convert to Object
        console.log(obj);
        if (timer[1] === 'astra' || timer[1] === 'astrahus' && timer.length === 6 && timer[2] === 'armor') {
          var id = obj.astrahus.armor.length + 1;
          obj.astrahus.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();
        } else if (timer[1] === 'astra' || timer[1] === 'astrahus' && timer.length === 7 && timer[2] === 'hull') {

          var id = obj.astrahus.hull.length + 1;
          obj.astrahus.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();
        } else if (timer[1] === 'fort' || timer[1] === 'fortizar' && timer.length === 7 && timer[2] === 'armor') {

          var id = obj.fortizar.armor.length + 1;
          obj.fortizar.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'fort' || timer[1] === 'fortizar' && timer.length === 7 && timer[2] === 'hull') {

          var id = obj.fortizar.hull.length + 1;
          obj.fortizar.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'keep' || timer[1] === 'keepstar' && timer.length === 7 && timer[2] === 'armor') {

          var id = obj.keepstar.armor.length + 1;
          obj.keepstar.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'keep' || timer[1] === 'keepstar' && timer.length === 7 && timer[2] === 'hull') {

          var id = obj.keepstar.hull.length + 1;
          obj.keepstar.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'athanor' && timer.length === 7 && timer[2] === 'armor') {

          var id = obj.athanor.armor.length + 1;
          obj.athanor.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'athanor' && timer.length === 7 && timer[1] === 'hull') {

          var id = obj.athanor.hull.length + 1;
          obj.athanor.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'tatara' && timer.length === 7 && timer[2] === 'armor') {

          var id = obj.tatara.armor.length + 1;
          obj.tatara.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'tatara' && timer.length === 7 && timer[2] === 'hull') {

          var id = obj.tatara.hull.length + 1;
          obj.tatara.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'sotiyo' && timer.length === 7 && timer[2] === 'armor') {

          var id = obj.sotiyo.armor.length + 1;
          obj.sotiyo.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'sotiyo' && timer.length === 7 && timer[2] === 'hull') {

          var id = obj.sotiyo.hull.length + 1;
          obj.sotiyo.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'azbel' && timer.length === 7 && timer[2] === 'armor') {

          var id = obj.azbel.armor.length + 1;
          obj.azbel.armor.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'azbel' && timer.length === 7 && timer[2] === 'hull') {

          var id = obj.azbel.hull.length + 1;
          obj.azbel.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[3],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'spos' && timer.length === 6) {

          var id = obj.spos.hull.length + 1;
          obj.spos.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[2],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'mpos' && timer.length === 6) {

          var id = obj.mpos.hull.length + 1;
          obj.mpos.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[2],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        } else if (timer[1] === 'lpos' && timer.length === 6) {

          var id = obj.lpos.hull.length + 1;
          obj.lpos.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[2],
            "enteredby": "Anure"
          }); //Push Timer to Array
          saveJson();
        } else if (timer[1] === 'poco' && timer.length === 6) {

          var id = obj.poco.hull.length + 1;
          obj.poco.hull.push({
            "id": id,
            "type": timer[0],
            "timeentered": now,
            "expireson": ends,
            "system": timer[2],
            "enteredby": "Anure"
          }); //Push Timer to Array

          saveJson();

        }
      }
    });
  }

});