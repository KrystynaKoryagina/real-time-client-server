import React, { useState, useRef } from 'react';

export const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const socket = useRef();

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: 'connection',
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log('Socket закрыт');
    };

    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    };
  };

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message',
    };

    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Введите ваше имя"
          />
          <button onClick={connect}>Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map((item) => (
            <div key={item.id}>
              {item.event === 'connection' ? (
                <div className="connection_message">
                  Пользователь {item.username} подключился
                </div>
              ) : (
                <div className="message">
                  {item.username}. {item.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
