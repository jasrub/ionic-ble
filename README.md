Test [Cordova BLE plugin](https://github.com/don/cordova-plugin-ble-central) with Ionic  
  
This is an Ionic app that communicates with an ATTiny Microcontroller trough Bluetooth using HM-10 Bluetooth module.  

The board Eagle schematics, traces and outlines are in the "Board" folder.
The Arduino sketch programmed to the board is in the "Arduino" folder

For Making this:
- Make the board  
- Program the board and make sure it works usign a serial FTDI Cable (Sending '1' turns on the LED, sending '0' turns it off, '2' makes it blink. The board is constantly sending '0' when button is not pressed and '1' when it is.)  

- For uploading the app to an android phone.  
Install Ionic and Andriod SDK, then:  
`
    ionic platform add android  
    ionic plugin add com.megster.cordova.ble  
    ionic run
 `
- The App should now launch on your phone. make sure Bluetooth on youe phone is enabled and then look for HMSoft