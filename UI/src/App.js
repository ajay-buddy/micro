import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios"

const ENDPOINT = "https://ochat.dev";
// const ENDPOINT = "http://127.0.0.1:3001"

function App() {
  const [response, setResponse] = useState("");

  

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <p>
      It's <time dateTime={response}>{response}</time>
    </p>
    <button onClick={async () => {
      const resp = await axios.get(ENDPOINT+"/socket.io/");
      console.log(resp)
    }}>Click</button>
    </div>
  );
}

export default App;