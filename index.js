const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token, env } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    message.reply("command not recognised");
  }

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);

    if (env === "DEVELOPMENT") {
      message.reply(error.toString());
    }
  }
});

client.login(token);
