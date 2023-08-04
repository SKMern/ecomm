const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.sources": "./src",
      "sonar.login": "squ_ebf0c032012b46a9f1a92c42be32ff581a3f3ca8",
    },
  },
  () => process.exit()
);
