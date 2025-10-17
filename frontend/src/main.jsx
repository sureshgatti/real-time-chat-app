import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [room, setRoom] = useState("general");
  const [user, setUser] = useState("user" + Math.floor(Math.random() * 1000));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join", { room, user });
    socket.on("message", (msg) => setMessages((m) => [...m, msg]));
    socket.on("system", (msg) => setMessages((m) => [...m, { user: "system", text: msg }]));
    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("message", { room, user, text });
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Room: {room}</h2>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.user}:</b> {m.text}</div>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);