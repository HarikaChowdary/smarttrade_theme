var DefaultBuilder = require("truffle-default-builder");

module.exports = {
    build: new DefaultBuilder({
    "index.html": "index.html",
    "smaple.html": "smaple.html",
    "auction.html": "auction.html",
    "header.html": "header.html",
    "list.html" : "list.html",
      "footer.html": "footer.html",
      "rightPanel.html": "rightPanel.html",
    "createAuction.html": "createAuction.html",
    "about.html": "about.html",
    "list.js":[
      "javascripts/list.js"
    ],
    "app.js": [
      "javascripts/app.js",
    ],
    "smarttrade.js": [
      "javascripts/smarttrade.js"
    ],
    "network.js": [
      "javascripts/network.js"
    ],
    "auction.js": [
      "javascripts/auction.js"
    ],
    "createAuction.js": [
      "javascripts/createAuction.js"
    ],
    "about.js": [
      "javascripts/about.js"
    ],
    "jquery.min.js": [
      "javascripts/jquery.min.js"
    ],
    "bootstrap.min.js": [
      "javascripts/bootstrap.min.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "bootstrap.min.css": [
      "stylesheets/bootstrap.min.css"
    ],
    "bootstrap-theme.min.css": [
      "stylesheets/bootstrap-theme.min.css"
    ],
    "images/": "images/"
    }),
  rpc: {
    host: "localhost",
    // port: 8081
    port: 8545
  },
  networks: {
    "development": {
      network_id: "default"
    },
    "morden": {
      network_id: 2,
      gas: 4612388
    },
    "ropsten": {
      network_id: 3,
      gas: 8000000
    },
    "live": {
      network_id: 1
    }
  }
};
