/* 
  Работает поверх http протокола и устанавливается постоянное подключение.
  Но это подключение одностороннее. Только сервер может отправлять данные на клиент.
  Используется когда не надо двухсторонний обмен сообщении (например, уведомления)
*/

const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');

const PORT = 8080;

class MyEmitter extends EventEmitter {};

const emitter = new MyEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/connect', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  })

  emitter.on('message', (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`)
  });
});

app.post('/send-message', ((req, res) => {
  const message = req.body;
  emitter.emit('message', message);
  res.status(200);
}));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
