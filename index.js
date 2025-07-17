// 環境変数・KeepAliveサーバー
require("./keepalive.js");

const { Client, GatewayIntentBits, Events } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// 起動ログ
client.on("ready", () => {
  console.log("✅ Bot準備完了～");
  client.user.setPresence({ activities: [{ name: "すや監視👀" }] });
});

// メッセージ受信
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // メンションされたら
  if (message.mentions.has(client.user)) {
    sendReply(message, "呼んだ？");
    return;
  }

  // すや系ワード
  if (
    message.content.match(
      /<:guu:1278032793573654592>|<:oyasumi:1269887481130651690>|<:suyakokoa:1205302990924288041>|すや|<:ofton:1281926734899449950>|suya|SUYA|s u y a|す　や|ｽﾔ|スヤ|ｽや|スﾔ|すﾔ/,
    )
  ) {
    let responses = [
      { text: "<:cat_no:1206527934538711050>", weight: 0.14 },
      { text: "～社訓～【寝ずに戦え】", weight: 0.14 },
      { text: "～社訓～【甘えるな】", weight: 0.14 },
      { text: "～社訓～【気合で乗り切れ】", weight: 0.14 },
      {
        text: "https://tenor.com/view/death-explode-boom-bed-gif-16738972",
        weight: 0.14,
      },
      {
        text: "https://tenor.com/view/alarm-clock-family-guy-gif-25788822",
        weight: 0.14,
      },
      {
        text: "https://tenor.com/view/good-morning-gif-13667169",
        weight: 0.14,
      },
      { text: "<:cat_ok:1206527847137677322>", weight: 0.01 },
    ];
    let totalWeight = responses.reduce((sum, r) => sum + r.weight, 0);
    let random = Math.random() * totalWeight;
    let selected;
    for (let r of responses) {
      random -= r.weight;
      if (random < 0) {
        selected = r.text;
        break;
      }
    }
    sendMsg(message.channel.id, selected);
    return;
  }

  // !say コマンド
  if (message.content.startsWith("!say")) {
    const content = message.content.slice(4).trim();
    message.channel.send(content || "何を言えばいいの？");
  }
});

// ログイン
if (!process.env.TOKEN) {
  console.log("❌ TOKEN が設定されていません。");
  process.exit(1);
}
client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ ログインエラー:", err);
});

// ---------- ユーティリティ関数 ----------
function sendReply(message, text) {
  message
    .reply(text)
    .then(() => {
      console.log("リプライ送信:", text);
    })
    .catch(console.error);
}

function sendMsg(channelId, text, option = {}) {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel
      .send(text, option)
      .then(() => {
        console.log("メッセージ送信:", text);
      })
      .catch(console.error);
  } else {
    console.log("❌ チャンネルが見つかりません:", channelId);
  }
}
