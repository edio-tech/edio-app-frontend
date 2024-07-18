// React / React Library imports
import {useState, useEffect } from 'react';

// Custom imports
import useLogContext from 'hooks/useLogContext';

const WebSock = () => {

   const { development } = useLogContext;
   const [messages, setMessages] = useState([]);
   const [ws, setWs] = useState(null);
   const [inputValue, setInputValue] = useState('');

   useEffect(() => {
      const socket = new WebSocket('ws://127.0.0.1:8000/chatbot')
      setWs(socket);

      socket.onopen = () => {
         if ( development ) {
            console.log('WebSocket connection established');
         }
      }

      socket.onmessage = (event) => {
         setMessages(prevMessages => [...prevMessages , event.data])
      }

      socket.onclose = () => {
         if ( development ) {
            console.log('Websocket connection closed.')
         }
      }

      socket.onerror = (error) => {
         if ( development ) {
            console.log(`[error] ${error.message}`)
            setMessages(error.message)
         }
      }

      return () => {
         socket.close()
      };
   }, []);

   const sendMessage = () => {
      if (ws && inputValue.trim()) { // Check if input is not empty
         
         // NEW STUFF
         const assisantID = "asst_kL151hYfeng715XgC29aWWvX" // Hard coded for test example
         const message = JSON.stringify({
            assistant_api_id: assisantID,
            prompt: inputValue
         })
         
         ws.send(message);
         setInputValue(''); // Clear input field after sending message
      }
   };

   return (
      <div>
         <h1> WebSocket Test </h1>
         <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Type your message here"
         />
         <button onClick = {sendMessage}> Send Message </button>
         <ul>
            {messages}
         </ul>
      </div>
   )
}

export default WebSock;