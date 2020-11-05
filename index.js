const TelegramBot = require('node-telegram-bot-api');


// replace the value below with the Telegram token you receive from @BotFather
const token = '1453933064:AAGlcHde8IHk4z2iSP_jLaJ45bwpYbYN-Bs';

// включаем самого обота
const bot = new TelegramBot(token, { polling: true });
let counter = 1
//конфиг клавиатуры
const keyboard = [
  [
    {
      text: 'Image 1', // текст на кнопке
      callback_data: 'image1' // данные для обработчика событий
    }
  ],
  [
    {
      text: 'Image 2',
      callback_data: 'image2'
    }

  ],
  [
    {
      text: 'INSTA LINK',
      url: 'https://instagram.com' //внешняя ссылка
    }
  ]
];

const inlinekeyboard = [
  [
    {
      text: 'button 1',
    },
    {
      text: 'button 2',
    },
    {
      text: 'button 3',
    }
  ],
  [
    {
      text: 'button 4',
    },
    {
      text: 'button 5',
    }
  ],
  [
    {
      text: 'button 6',
    },
    {
      text: 'Show img',
    },
    {
      text: 'Reset counter ⏳',
    }
  ]
];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
  console.log(msg);
  if (msg.text === 'Show img') {
    img = '1.png';
    bot.sendPhoto(chatId, img, { // прикрутим клаву
      reply_markup: {
        inline_keyboard: keyboard,
        resize_keyboard: true
      }
    });
  } else if (msg.text === 'Reset counter ⏳') {
    bot.sendMessage(chatId, `Counter reseted`, { // прикрутим клаву
      reply_markup: {
        keyboard: inlinekeyboard,
        resize_keyboard: true,
        inline_keyboard: keyboard,
      }
    }).then(() => counter = 0).catch(err => console.log(err));
  }
  else {
    // отправляем сообщение
    bot.sendMessage(chatId, `You clicked: ${msg.text}. \nClicks counter is ${counter}`, { // прикрутим клаву
      reply_markup: {
        keyboard: inlinekeyboard,
        resize_keyboard: true,
        inline_keyboard: keyboard,
      }
    }).then(() => counter++).catch(err => console.log(err));
  }
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  let img = '';

  if (query.data === 'image1') { // если кот
    img = '1.png';
  }

  if (query.data === 'image2') { // если пёс
    img = '2.png';
  }

  if (img) {
    bot.sendPhoto(chatId, img, { // прикрутим клаву
      reply_markup: {
        inline_keyboard: keyboard,
        resize_keyboard: true
      }
    });
  } else {
    bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
      reply_markup: {
        inline_keyboard: keyboard
      }
    });
  }
});