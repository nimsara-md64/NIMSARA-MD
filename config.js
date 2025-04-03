const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "kwRSBYwY#YepO8dsFMaxVt3cmI51fP9KDfeqMVQkqbybwVGxszhc",
  OWNER_NUM: process.env.OWNER_NUM || "94742249044",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/nimsara-md64/Bot-helper/refs/heads/main/Alive.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n🚫𝐌𝐚𝐝𝐞 𝐛𝐲 𝐍_𝐈_𝐌_𝐒_𝐀_𝐑_𝐀🚫 ",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
    
};
