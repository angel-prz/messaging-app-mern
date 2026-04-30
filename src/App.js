import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import axios from "./components/axios";
import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import { useStateValue } from "./components/StateProvider";

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get("/messages/sync").then((res) => {
        setMessages(res.data);
      });
    }, 1000);

    /* return () => clearTimeout(timer); */
  }, []);

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar messages={messages} />
          <Chat messages={messages} />
        </div>
      )}
    </div>
  );
}

export default App;
