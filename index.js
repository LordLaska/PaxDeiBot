const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;

// <- tutaj wklej token swojego bota

const SERVER_ID = '933034904780959744'; // Twój ID serwera
const ROLE_ID = '1376581414455087316';  // ID roli Pax Dei - Rekrut
const CHANNEL_ID = '1376588455966146670'; // ID kanału rekruci

client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  try {
    const guild = client.guilds.cache.get(SERVER_ID);
    if (!guild) return;

    // Sprawdzamy czy ktoś dostał nową rolę
    if (!oldMember.roles.cache.has(ROLE_ID) && newMember.roles.cache.has(ROLE_ID)) {
      const channel = guild.channels.cache.get(CHANNEL_ID);
      if (!channel) return;

      // Wysyłamy wiadomość na kanał
      channel.send(`Hej <@${newMember.id}>, pamiętaj żeby wypełnić ten formularz: https://discord.com/channels/933034904780959744/1376569952525488399`);
    }
  } catch (error) {
    console.error('Błąd:', error);
  }
});

client.login(TOKEN);
