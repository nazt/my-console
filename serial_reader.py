import time
import serial
import requests
import sys
import pebble as libpebble
from datetime import datetime

# configure the serial connections (the parameters differs on the device you are connecting to)
s = serial.Serial(
    port='/dev/tty.usbmodemfa131',
    baudrate=9600,
    parity=serial.PARITY_ODD,
    stopbits=serial.STOPBITS_TWO,
    bytesize=serial.SEVENBITS
)

pebble_id = "719E" 
pebble = libpebble.Pebble(pebble_id, None , None)

last_text = ""
while True:
  text = s.readline().strip().decode("utf-8")
  if text != last_text:
    splt = text.split(",")
    print "requesting: ", text

    if splt[0] == '$$$':
      print "GOT $$$", splt[1]
      if int(splt[1]) <= 5:
        pebble.notification_email("Alert", "Someone in your ", "bed room")
    try:
      pass
      #requests.get('http://192.168.42.1:3000/sensor/' + text, timeout=3) 
    except Exception:
      print "ERROR" 

    last_text = text
  else:
      print "skip...."
