const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramToken = '6788722063:AAEm_UEtvlRTg1zXzOPgBQazK3U5ZTiYmkc';
const cloudflareToken = 'lVMfE4w946QFdHLhrgix8s37mJYivOxB7MuW19yH';

const bot = new TelegramBot(telegramToken, {polling: true});

console.log('Loaded success..')

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  axios.post('https://api.cloudflare.com/client/v4/accounts/{YOUR_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8', {
    prompt: userMessage
  }, {
    headers: {
      'Authorization': `Bearer ${cloudflareToken}`
    }
  }).then(response => {
    const aiResponse = response.data.result.response;
    bot.sendMessage(chatId, aiResponse);
  }).catch(error => {
    console.error(error);
  });
});
