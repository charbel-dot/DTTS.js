const Discord = require("discord.js");
const config = require("./config/config.json");

// defining the client object
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === "?join") {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
});

// Create an event listener for messages
client.on("message", async (message) => {
  if (message.content === "what is my avatar") {
    await message.reply(`Your Avatar is ${message.author.displayAvatarURL()}`);
  } else if (message.content === "ping") {
    await message.reply("pong!");
  } else if (message.content === "pizza") {
    await message.channel.send("🍕");
  }
});

// simple guessing game
client.on("message", async (message) => {
  if (message.content === "guess") {
    await message.reply("Guess a number between 1 and 20!");
    var number = Math.floor(Math.random() * 20);
    await message.channel.send(number);
    if (message.content.toString === number.toString) {
      await message.reply("You win");
    }
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

client.on("message", async (message) => {
  var sad_words = sad[Math.floor(Math.random() * sad.length)];
  if (
    message.content === "i'm sad" ||
    message.content === "I'm sad" ||
    message.content === "i am sad" ||
    message.content === "I'm sad"
  ) {
    await message.reply(`I 'm ${sad_words}`);
  }
});

// Activity tab
const activities = [
  "with the ?help command.",
  "with the developers console.",
  "with some code.",
  "with JavaScript.",
  "with my pp",
  "with songs",
];

client.on("ready", () => {
  // run every 10 seconds
  setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity);
  }, 10000);
});

client.login(config.token);
