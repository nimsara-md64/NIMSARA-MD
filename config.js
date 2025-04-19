const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "BgI2HLIY#R0tRq3btNMgIB2cSIDAMwPfxJOyoAvsD4A-WY4ycYuo",
  OWNER_NUM: process.env.OWNER_NUM || "94742249044",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/nimsara-md64/Bot-helper/refs/heads/main/Alive.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n🚫𝐌𝐚𝐝𝐞 𝐛𝐲 𝐍_𝐈_𝐌_𝐒_𝐀_𝐑_𝐀🚫 ",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "true",
  AUTO_REPLY: process.env.AUTO_REPLY || "true",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSyCygIxiFgNtrAaAl6F-QKFgSmTEmLj9jDQ",
  MOVIE_API_KEY: process.env.MOVIE_API_KEY || "https://api.skymansion.site/movies-dl"
    
};
