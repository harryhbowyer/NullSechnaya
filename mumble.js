var mumble = require('mumble'),
    fs = require('fs');

var options = {
    key: fs.readFileSync( 'key.pem' ),
    cert: fs.readFileSync( 'cert.pem' ),
    
};

console.log( 'Connecting' );
mumble.connect( 'mumble://voice.nullsechnaya.space', options, function ( error, connection ) {
    if( error ) { throw new Error( error ); }

    console.log( 'Connected');

    connection.authenticate( 'NSH.EXE' , 'sholupen');
    connection.on( 'initialized', onInit );
    connection.on( 'voice', onVoice );
    connection.on( 'message' , onMsg);
  connection.on( 'user-move', function( user ) {

    console.log( 'User ' + user.name + ' moved' );

});
  //console.log(connection.users())
});

var onInit = function() {
    console.log( 'Connection initialized' );

    // Connection is authenticated and usable.
};

var onMsg = function() {
  var users = connection.users();
    console.log( users );

    // Connection is authenticated and usable.
};

var onVoice = function( voice ) {
    console.log( 'Mixed voice' );

    var pcmData = voice;
};