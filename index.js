const fetch = require("node-fetch");

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;

const SERVER_ID = "933034904780959744"; // Twój ID serwera
const ROLE_ID = "1376581414455087316"; // ID roli Pax Dei - Rekrut
const CHANNEL_ID = "1376588455966146670"; // ID kanału rekruci

client.on("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    const guild = client.guilds.cache.get(SERVER_ID);
    if (!guild) return;

    const hadRole = oldMember.roles.cache.has(ROLE_ID);
    const hasRoleNow = newMember.roles.cache.has(ROLE_ID);

    // Wiadomość wysyłana tylko gdy rola została DODANA (wcześniej nie było jej, teraz jest)
    if (!hadRole && hasRoleNow) {
      const channel = guild.channels.cache.get(CHANNEL_ID);
      if (!channel) return;

      channel.send(
        `Hej <@${newMember.id}>, pamiętaj żeby wypełnić ten formularz: https://discord.com/channels/933034904780959744/1376569952525488399 a w międzyczasie zapraszam do https://discord.com/channels/933034904780959744/1376567528461176967`,
      );
    }
  } catch (error) {
    console.error("Błąd:", error);
  }
});

client.login(TOKEN);

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot działa!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

// Keep-alive - pinguj co 5 minut swój serwer, żeby Replit nie wyłączył aplikacji
setInterval(() => {
  fetch("https://295d7751-08c6-496b-91e1-1317a307a853-00-jaibn772752w.picard.replit.dev/")
    .then(() => console.log("Ping self - utrzymanie aktywności"))
    .catch((err) => console.error("Błąd keep-alive:", err));
}, 2.5 * 60 * 1000); // co 2,5 minut

