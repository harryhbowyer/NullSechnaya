const webshot = require('webshot');

const saveAndReturnFilename = (delta => {
    var rando = Math.random();
    webshot(delta, './deltaoutput/' + rando + 'delta.png', optionSelector, function(err) {

      if (err) {
        console.log(err);
      }

      console.log('Screenshot Taken');
        return "./deltaoutput/" + rando + "delta.png";
    });

});

module.exports = saveAndReturnFilename;
