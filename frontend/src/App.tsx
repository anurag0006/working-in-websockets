import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState("");
  const [x, setX] = useState("");

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket("ws://localhost:8080");

    // Connection opened:
    ws.onopen = () => {
      console.log("Connected");
      setSocket(ws);
    };

    // Listen for messages
    ws.onmessage = (message) => {
      console.log("Message received:", message.data);
      setMsg(message.data); // Update state with the received message
    };

    // Clean up on unmount
    return () => {
      ws.close();
      console.log("Disconnected");
    };
  }, []);

  const handleSend = () => {
    if (!x) {
      window.alert("First add something in message");
      return;
    }
    if (socket) {
      socket.send(x);
      setX(""); // Clear input after sending message
    } else {
      window.alert("WebSocket is not connected.");
    }
  };

  if (!socket) return <div>Loading...</div>;

  return (
    <div>
      WebSocket is connected!
      <div>Message: {msg}</div>
      <div>
        <input
          value={x}
          onChange={(e) => setX(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
