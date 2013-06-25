import pebble as libpebble
pebble_id = "719E"

pebble = libpebble.Pebble(pebble_id, None , None)

pebble.notification_sms("nat", "Hi")
pebble.notification_email("Nat", "hello", "BODY")
