

const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    alise: ["getmenu"],
    react: "💗"
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
      const config = await readEnv();
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category
          ] += `${config.PREFIX}${commands[i].pattern}\n`;
        }
      }

      let madeMenu = `👋✨ *Hello...🍷  ${pushname}*


| *MAIN COMMANDS* |
    â–«ï¸.alive
    â–«ï¸.menu
    â–«ï¸.ai <text>
    â–«ï¸.system
    â–«ï¸.owner
| *DOWNLOAD COMMANDS* |
    â–«ï¸.song <text>
    â–«ï¸.video <text>
    â–«ï¸.fb <link>
| *GROUP COMMANDS* |
${menu.group}
| *OWNER COMMANDS* |
    â–«ï¸.restart
    â–«ï¸.update
| *CONVERT COMMANDS* |
    â–«ï¸.sticker <reply img>
    â–«ï¸.img <reply sticker>
    â–«ï¸.tr <lang><text>
    â–«ï¸.tts <text>
| *SEARCH COMMANDS* |
${menu.search}


🚫 Made By 𝐍_𝐈_𝐌_𝐒_𝐀_𝐑_𝐀 🚫

> NIMSARA MENU MSG
`;
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
      console.log(e);
      reply(`${e}`);
    }
  }
);
