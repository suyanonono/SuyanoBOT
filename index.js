// 環境変数読み込み
require("dotenv").config();
console.log("🚀 index.js started");
console.log("TOKEN:", process.env.TOKEN);

// discord.js
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 起動成功時
client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// メッセージ受信イベント
client.on("messageCreate", (msg) => {
  console.log(`📩 ${msg.author.tag}: ${msg.content}`);
  if (msg.content === "ping") {
    msg.channel.send("pong!");
  }
});

// トークン表示（テスト用）
console.log("TOKEN:", process.env.TOKEN);

// ログイン（catchでエラー捕捉）
client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ ログインエラー:", err);
});