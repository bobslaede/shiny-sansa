"use strict";

module.exports = {
  mongo : {
    port: process.env.DB_PORT_27017_TCP_PORT || 27017,
    host: process.env.DB_PORT_27017_TCP_ADDR || 'localhost'
  }
}
