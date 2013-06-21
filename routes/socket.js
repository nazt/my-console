/*
 * Serve content over a socket
 */

const redis = require('redis');

module.exports = function (socket) {
    var sub = redis.createClient();
    sub.subscribe("rfid_ch") ;
    sub.on('message', function(channel, message) {
        // console.log('got message', JSON.stringify(message, channel);
        socket.emit('receive:rfidTag', { tagId: message});
    })

    socket.on('subscribe', function(pattern) {
        //console.log('subscribe ' + pattern);
        // sub.subscribe(pattern)
        console.log('subscribe');
    })

    socket.on('disconnect', function() {
        sub.quit();
    });

    var sensor_sub = redis.createClient();
    sensor_sub.subscribe("sensor_ch") ;

    sensor_sub.on('message', function(channel, message) {
      console.log('emit sensor')
      socket.emit('receive:sensorMsg', { sensorMsg: message })
    })


    sensor_sub.on('disconnect', function() {
        sensor_sub.quit();
    });

  socket.emit('send:name', {
    name: 'Bob'
  });

  // socket.emit('send:tagId', {
  //   name: 
  // });  

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);
};
