const { env } = require("../config.json");

module.exports = {
  name: "play",
  description: "Plays a sound if in voice channel",
  execute(message, args) {
    if (args.toString().toLowerCase().includes("youtube")) {
      console.log("YouTube detected...");
      playYoutube(message, message.member.voice.channel, args);
    } else {
      message.reply("please specify a youtube link");
    }
  },
};

async function playYoutube(message, voiceChannel, args) {
  try {
    const connection = await voiceChannel.join();
    const ytdl = require("ytdl-core");
    connection.play(
      ytdl(args.toString(), {
        filter: "audioonly",
      })
    );
  } catch (error) {
    console.error(error);
    if (env === "DEVELOPMENT") {
      message.reply(error.toString());
    }
  }
}
