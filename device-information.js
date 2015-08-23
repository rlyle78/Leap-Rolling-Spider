"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", uuid: "d2edda91562142e988ffcb4a595f8cd9", module: "cylon-ble" }
  },

  devices: {
    deviceInfo: { driver: "ble-device-information" }
  },

  work: function(my) {
    my.deviceInfo.getManufacturerName(function(err, data) {
      if (err) {
        console.log("error: ", err);
        return;
      }

      console.log("data: ", data);
    });
  }
}).start();
