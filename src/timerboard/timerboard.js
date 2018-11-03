const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const prefix = settings.prefix;
const moment = require('moment');
const file = require('file-system');
const fs = require('fs');
const countdown = require('moment-countdown');
const schedule = require('node-schedule');

client.login(settings.private.nsh);
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  var messageSanitized = message.content.toLowerCase();
  var command = message.content.startsWith(prefix + 'timers');
  if (command) {
    message.channel.fetchMessage('502247592428699660')
      .then(msg => {

        var j = schedule.scheduleJob('*/5 * * * * *', function() {
          fs.readFile('timers.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              var client = new Discord.Client();
              obj = JSON.parse(data); //Convert to Object
              var astrahus = obj.astrahus;
              var fortizar = obj.fortizar;
              var keepstar = obj.keepstar;
              var athanor = obj.athanor;
              var tatara = obj.tatara;
              var raitaru = obj.raitaru;
              var azbel = obj.azbel;
              var sotiyo = obj.sotiyo;
              var sPos = obj.spos;
              var mPos = obj.mpos;
              var lPos = obj.lpos;
              var poco = obj.poco;
              var objectLength = (astrahus.armor.length + astrahus.hull.length + raitaru.armor.length + raitaru.hull.length + fortizar.armor.length + fortizar.hull.length + azbel.armor.length + azbel.hull.length + keepstar.armor.length + keepstar.hull.length + sotiyo.armor.length + sotiyo.hull.length + athanor.armor.length + athanor.hull.length + tatara.armor.length + tatara.hull.length + sPos.hull.length + mPos.hull.length + lPos.hull.length + poco.hull.length);
              let timerPromise = new Promise((resolve, reject) => {
                let timerList = [];
                if (astrahus.armor.length >= 1) {
                  astrahus.armor.forEach(aatimer => {
                    if (aatimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = aatimer.expireson.split(" ");
                    timerList.push(timerType + " Astrahus Armor timer located in " + aatimer.system + " in **" + moment(moment().toString()).countdown(aatimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (astrahus.hull.length >= 1) {
                  astrahus.hull.forEach(ahtimer => {
                    if (ahtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = ahtimer.expireson.split(" ");

                    timerList.push(timerType + " Astrahus Hull timer located in " + ahtimer.system + " in **" + moment(moment().toString()).countdown(ahtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (fortizar.armor.length >= 1) {
                  fortizar.armor.forEach(fatimer => {
                    if (fatimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = fatimer.expireson.split(" ");
                    timerList.push(timerType + " **Fortizar Armor timer** located in **" + fatimer.system + "** in **" + moment(moment().toString()).countdown(fatimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (fortizar.hull.length >= 1) {
                  fortizar.hull.forEach(fhtimer => {
                    if (fhtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = fhtimer.expireson.split(" ");
                    timerList.push(timerType + " **Fortizar Hull timer** located in **" + fhtimer.system.toUpperCase() + "** in **" + moment(moment().toString()).countdown(fhtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (keepstar.armor.length >= 1) {
                  keepstar.armor.forEach(katimer => {
                    if (katimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = katimer.expireson.split(" ");
                    timerList.push(timerType + " **Keepstar Armor timer** located in **" + katimer.system + "** in **" + moment().countdown(katimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (keepstar.hull.length >= 1) {
                  keepstar.hull.forEach(khtimer => {
                    if (khtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = khtimer.expireson.split(" ");
                    timerList.push(timerType + " **Keepstar Hull timer** located in **" + khtimer.system + "** in **" + moment().countdown(khtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (raitaru.armor.length >= 1) {
                  raitaru.armor.forEach(ratimer => {
                    if (ratimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = ratimer.expireson.split(" ");
                    timerList.push(timerType + " **Raitaru Armor timer** located in **" + ratimer.system + "** in **" + moment().countdown(ratimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (raitaru.hull.length >= 1) {
                  raitaru.hull.forEach(rhtimer => {
                    if (rhtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = rhtimer.expireson.split(" ");
                    timerList.push(timerType + " **Raitaru Hull timer** located in **" + rhtimer.system + "** in **" + moment().countdown(rhtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (azbel.armor.length >= 1) {
                  azbel.armor.forEach(azatimer => {
                    if (azatimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = azatimer.expireson.split(" ");
                    timerList.push(timerType + " **Azbel Armor timer** located in **" + azatimer.system + "** in **" + moment().countdown(azatimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (azbel.hull.length >= 1) {
                  azbel.hull.forEach(azhtimer => {
                    if (azhtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = azhtimer.expireson.split(" ");
                    timerList.push(timerType + " **Azbel Hull timer** located in **" + azhtimer.system + "** in **" + moment().countdown(azhtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (sotiyo.armor.length >= 1) {
                  sotiyo.armor.forEach(satimer => {
                    if (satimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = satimer.expireson.split(" ");
                    timerList.push(timerType + " **Sotiyo Armor timer** located in **" + satimer.system + "** in **" + moment().countdown(satimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (sotiyo.hull.length >= 1) {
                  sotiyo.hull.forEach(shtimer => {
                    if (shtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = shtimer.expireson.split(" ");
                    timerList.push(timerType + " **Sotiyo Hull timer** located in **" + shtimer.system + "** in **" + moment().countdown(shtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (athanor.armor.length >= 1) {
                  athanor.armor.forEach(atatimer => {
                    if (atatimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = atatimer.expireson.split(" ");
                    timerList.push(timerType + " **Athanor Armor Armor timer** located in **" + atatimer.system + "** in **" + moment().countdown(atatimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (athanor.hull.length >= 1) {
                  athanor.hull.forEach(athtimer => {
                    if (athtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = athtimer.expireson.split(" ");
                    timerList.push(timerType + " **Athanor Hull timer** located in **" + athtimer.system + "** in **" + moment().countdown(athtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (tatara.armor.length >= 1) {
                  tatara.armor.forEach(tatimer => {
                    if (tatimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = tatimer.expireson.split(" ");
                    timerList.push(timerType + " **Tatara Armor timer** located in **" + tatimer.system + "** in **" + moment().countdown(tatimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (tatara.hull.length >= 1) {
                  tatara.hull.forEach(thtimer => {
                    if (thtimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = thtimer.expireson.split(" ");
                    timerList.push(timerType + " **Tatara Hull timer** located in **" + thtimer.system + "** in **" + moment().countdown(thtimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (sPos.hull.length >= 1) {
                  sPos.hull.forEach(sptimer => {
                    if (sptimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = sptimer.expireson.split(" ");
                    timerList.push(timerType + " **Small POS timer** located in **" + sptimer.system + "** in **" + moment().countdown(sptimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (mPos.hull.length >= 1) {
                  mPos.hull.forEach(mptimer => {
                    if (mptimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = mptimer.expireson.split(" ");
                    timerList.push(timerType + " **Medium POS timer** located in **" + mptimer.system + "** in **" + moment().countdown(mptimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (lPos.hull.length >= 1) {
                  lPos.hull.forEach(lptimer => {
                    if (lptimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = lptimer.expireson.split(" ");
                    timerList.push(timerType + " **Large POS timer** located in **" + lptimer.system + "** in **" + moment().countdown(lptimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }
                if (poco.hull.length >= 1) {
                  poco.hull.forEach(ptimer => {
                    if (ptimer.type === "f") {
                      var timerType = "Friendly";
                    } else {
                      var timerType = "Hostile";
                    }
                    var eveTime = ptimer.expireson.split(" ");
                    timerList.push(timerType + " **Poco timer** located in **" + ptimer.system + "** in **" + moment().countdown(ptimer.expireson).toString() + "** at " + eveTime[4] + " EVE TIME\n")
                    if (objectLength === timerList.length) {
                      resolve(timerList);
                    }
                  })

                }

              })

              timerPromise.then((timerList) => {
                msg.edit(timerList)
              });
            }
          });
        });
      })
  }
});