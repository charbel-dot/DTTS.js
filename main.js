const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const config = require("./config/config.json");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = config.prefix;

// When the bot is ready display a message in the console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Activity tab
const activities = [
  "with the ?help command.",
  "with Clash Of Clans",
  "with some code.",
  "with JavaScript.",
  "with my pp",
  "with songs",
];

client.on("ready", () => {
  setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity);
  }, 10000); // 10 seconds delay
});

// Create an event listener for messages
client.on("messageCreate", async (message) => {
  if (message.content === "what is my avatar") {
    await message.reply(`Your Avatar is ${message.author.displayAvatarURL()}`);
  }
  else if (message.content === "pizza") {
    await message.channel.send("🍕");
  }
});

// some sad quotes
let sad = [
  "hopeless",
  "gloomy",
  "heartbroken",
  "sorrowful",
  "glum",
  "dispirited",
  "dejected",
  "woeful",
  "disheartened",
  "crushed",
  "crestfallen",
];

// sad stuff
client.on("messageCreate", async (message) => {
  var sad_words = sad[Math.floor(Math.random() * sad.length)];
  if (
    message.content.toLowerCase() === "i'm sad" ||
    message.content.toLowerCase() === "i am sad"
  ) {
    await message.channel.send(`I 'm ${sad_words}`);
  }
});

client.on("messageCreate", async (message) => {
  var randomColor = `#` + ((1 << 24) * Math.random() | 0).toString(16);
  const embedColor = {
    color: randomColor,
    title: 'Random Hex generator',
    description: "Color code: " + "`" + randomColor + "`"
  };

  if (message.content.startsWith(`${prefix}color`))
  {
    await message.channel.send({ embeds: [embedColor]});
  }
  /*
  else if (message.content.startsWith(`${prefix}help`))
  {
    await channel.send({ embeds: [helpEmbed] });
  }
  */
});

// sending files
client.on("messageCreate", async (message) => {
  if (message.content === "send me a random file") {
    await channel.send("There is a random file.", {
      file: [
        "",
        ""
      ]
    });
  }
});

// latency command
client.on('messageCreate', async (message) => {
  if (message.content === `${prefix}ping`) {
    await message.channel.send(`🏓 **Latency** is ${Date.now() - message.createdTimestamp}ms`);
  }
});

client.login(config.token);
