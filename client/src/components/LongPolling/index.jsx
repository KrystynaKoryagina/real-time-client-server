import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const LongPolling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/get-message');
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    await axios.post('http://localhost:8080/send-message', {
      message: value,
      id: Date.now(),
    });
  };

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
            <div className="message" key={item.id}>
              {item.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
