const swag = require("eve-swagger");
const output = require("./deltatrackerFS.js");

const processor = async (command) => {
  const dotlan = 'http://evemaps.dotlan.net/map/';
  const tag = '#npc_delta';
  var regionFound = await swag.regions.search(command);
  var regionInfo =  await swag.regions(regionFound).info();

  console.log(regionFound);
  console.log(regionInfo.name.replace(` `, "_"));

    const optionSelector = {
      captureSelector: '.clearfix',
      windowSize: { width: 1350
          , height: 768 }
      , renderDelay: 1000

    };
    console.log(dotlan + regionInfo.name.replace(` `, "_") + tag);
    var delta = (dotlan + regionInfo.name.replace(` `, "_") + tag);
    var rando = Math.random();

    output(delta);
};

module.exports = processor;
