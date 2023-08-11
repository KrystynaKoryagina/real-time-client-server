/* 
  Клиент отправляет запрос. Но сервер ему ничего не возвращает.
  Запрос повисает и ждет ответа.
  Если время ожидания закончилось, то с клиента отправляется повторный запрос и продолжаем ждать.
  Ждем пока не произойдет какое то событие (например, отправка сообщения другим пользователем).
  Когда событие произойдет, запрос продолжает висеть, но сервер возвращает ответ на клиент.
  Клиент после получения ответа, заново отправляет запрос, который повисает до след. события.

  Постоянное соединение не устанавливается.
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

app.get('/get-message', (req, res) => {
  emitter.once('message', (message) => {
    res.json(message);
  })
});

app.post('/send-message', ((req, res) => {
  const message = req.body;
  emitter.emit('message', message);
  res.status(200);
}));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
