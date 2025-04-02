const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "kwRSBYwY#YepO8dsFMaxVt3cmI51fP9KDfeqMVQkqbybwVGxszhc",
  MONGODB: process.env.MONGODB || "mongodb://mongo:IwKbvCdaZbiAgwuRZVgRUgqchoeiSPfC@shortline.proxy.rlwy.net:31127",
  OWNER_NUM: process.env.OWNER_NUM || "94742249044",
};
