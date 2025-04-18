cmd(
  {
    pattern: "^[1-9]|10$",
    react: "✅",
    desc: "Menu selector",
    category: "main",
    filename: __filename,
  },
  async (robin, mek, m, { body, reply }) => {
    try {
      let num = parseInt(body.trim());

      const menus = {
        1: "*⬇️ Download Menu:*\n➥ .song <name>\n➥ .video <name>\n➥ .fb <link>",
        2: "*🔍 Search Menu:*\n➥ .ytsearch <query>\n➥ .image <query>",
        3: "*🤖 AI Menu:*\n➥ .ai <text>\n➥ .gpt <text>",
        4: "*👑 Owner Menu:*\n➥ .update\n➥ .restart\n➥ .broadcast",
        5: "*👥 Group Menu:*\n➥ .kick\n➥ .promote\n➥ .tagall",
        6: "*ℹ️ Info Menu:*\n➥ .alive\n➥ .ping\n➥ .system",
        7: "*🔄 Converter Menu:*\n➥ .sticker\n➥ .img\n➥ .tts <text>",
        8: "*🎲 Random Menu:*\n➥ .quote\n➥ .joke\n➥ .fact",
        9: "*🖼️ Wallpapers Menu:*\n➥ .wallpaper <query>\n➥ .animewall",
        10: "*📦 Other Menu:*\n➥ .calc\n➥ .short <url>",
      };

      if (menus[num]) {
        await reply(menus[num]);
      } else {
        await reply("❌ Invalid selection. Please reply with a number between 1 and 10.");
      }
    } catch (err) {
      console.error(err);
      await reply("Error handling your menu selection.");
    }
  }
);
