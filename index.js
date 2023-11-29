const app = require("./src/app.js")
function main() {
  app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
}

main();