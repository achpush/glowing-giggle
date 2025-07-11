const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/send', async (req, res) => {
  const { message } = req.body;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(telegramUrl, { chat_id: chatId, text: message });
    res.status(200).send('Message sent to Telegram');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error sending message');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
