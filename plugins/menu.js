const { cmd, commands } = require("../command");
const config = require('../config');
cmd(
  {
    pattern: "menu",
    alias: ["getmenu"],  // Fixed typo: 'alise' to 'alias'
    react: "💯",
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
    let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      // Generate menu items for each category
      for (let cmd of commands) {
        if (cmd.pattern && !cmd.dontAddCommandList && menu[cmd.category] !== undefined) {
          menu[cmd.category] += `${config.PREFIX}${cmd.pattern}\n`;
        }
      }

      // Create the menu message
      let madeMenu = `👋✨ *Hello...🍷  ${pushname || "User"}*\n\n` +
        `| *MAIN COMMANDS* |\n` +
        `    ➥ .alive\n` +
        `    ➥ .menu\n` +
        `    ➥ .ai <text>\n` +
        `    ➥ .system\n` +
        `    ➥ .owner\n` +
        `| *DOWNLOAD COMMANDS* |\n` +
        `    ➥ .song <text>\n` +
        `    ➥ .video <text>\n` +
        `    ➥ .fb <link>\n` +
        `| *GROUP COMMANDS* |\n` +
        `${menu.group || "    ➥ No group commands available\n"}` +
        `| *OWNER COMMANDS* |\n` +
        `    ➥ .restart\n` +
        `    ➥ .update\n` +
        `| *CONVERT COMMANDS* |\n` +
        `    ➥ .sticker <reply img>\n` +
        `    ➥ .img <reply sticker>\n` +
        `    ➥ .tr <lang><text>\n` +
        `    ➥ .tts <text>\n` +
        `| *SEARCH COMMANDS* |\n` +
        `${menu.search || "    ➥ No search commands available\n"}\n\n` +
        `🚫 Made By 𝐍_𝐈_𝐌_𝐒_𝐀_𝐑_𝐀 🚫\n\n` +
        `> NIMSARA MENU MSG`;
      
      await robin.sendPresenceUpdate('recording', from);
      await robin.sendMessage(from, { audio: { url: "https://github.com/nimsara-md64/Bot-helper/raw/refs/heads/main/audio/Bot%20auto%20voice%20.mp3" }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    }

      // Send the menu with image
      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/nimsara-md64/Bot-helper/refs/heads/main/Menu.jpg",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("Error in menu command:", e);
      await reply(`❌ Error generating menu: ${e.message}`);
    }
  }
);
