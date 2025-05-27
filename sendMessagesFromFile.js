const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const TOKEN = process.env.DISCORD_TOKEN;  // token z sekretów Replita
const CHANNEL_ID = "1376567255097151568"; // podmień na swój kanał
const MESSAGES_FILE = "messages.txt";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      console.error("Nie znaleziono kanału o podanym ID");
      process.exit(1);
    }

    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");

    // Dzielimy po pustej linii (dwa lub więcej \n, uwzględniając Windows i Unix)
    const messages = data
      .split(/\r?\n\r?\n+/)
      .map(msg => msg.trim()) // usuwamy białe znaki na początku i końcu wiadomości
      .filter(msg => msg.length > 0);

    for (const msg of messages) {
      try {
        await channel.send(msg);
        console.log(`Wysłano wiadomość: ${msg}`);
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error("Błąd podczas wysyłania wiadomości:", err);
      }
    }

    console.log("Wszystkie wiadomości wysłane.");
    client.destroy();
  } catch (fetchErr) {
    console.error("Błąd podczas pobierania kanału:", fetchErr);
    process.exit(1);
  }
});


client.login(TOKEN);
