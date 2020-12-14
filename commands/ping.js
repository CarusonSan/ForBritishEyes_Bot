module.exports = {
  name: "ping",
  description: "Ping user with latency of reply.",
  execute(message, args) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`this message had a latency of ${timeTaken}ms.`);
  },
};
