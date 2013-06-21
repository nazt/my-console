import time
import serial
import requests
import sys
from datetime import datetime

# configure the serial connections (the parameters differs on the device you are connecting to)
s = serial.Serial(
    port='/dev/tty.usbmodemfa131',
    baudrate=9600,
    parity=serial.PARITY_ODD,
    stopbits=serial.STOPBITS_TWO,
    bytesize=serial.SEVENBITS
)


while True:
  text = s.readline().strip().decode("utf-8")
  print text
  #print requests.get('http://192.168.42.1:3000/sensor/' + text)
  #time.sleep(1)
