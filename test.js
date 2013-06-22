var request = require("request");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/tty.usbmodemfa131", { 
    parser: serialport.parsers.readline("\r\n") 
});


var last_msg = '';
sp.on("data", function (data) {
  var text = data.trim();
  if (last_msg === text) { 
    console.log('skip..')
  }
  else {
    console.log(text);
    try {
      request.get('http://192.168.42.1:3000/sensor/'+text); 
    }
    catch (e) {
      console.log('error occured', e);
    }
  } 
  last_msg = text;

});

