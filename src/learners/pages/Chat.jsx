// React / React Library imports
import * as Form from '@radix-ui/react-form';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';

// Custom imports
import ChatsAPILink from 'api_link/chats'
import useLogContext from 'hooks/useLogContext';

// Styling
import 'styles/learners/chat.css'

const Chat = () => {

   const { development } = useLogContext();
   const [loading, setLoading] = useState(false)
   const [response, setResponse] = useState(null)

   

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const data = Object.fromEntries(new FormData(e.currentTarget));

      const res = await ChatsAPILink.chat(data);
      setLoading(false);
      if ( res.status !== 200) {
         let errors = await res['data']
         /* Add a way to display chat response errors to user */
         if ( development ) {
            console.log('Login Failed.', errors)
         }
         return
      }
      const responseObject = await res.data;
      setResponse(responseObject.data.response)
   }


   return (
      <div className = "flex-main-container">
         <div className = "flex-conversation-container">
            Conversation
         </div>
         <div className = "flex-chat-container">
            <div className = "messages-container mrg">
               {response}
            </div>
            <div className = "input-box mtg">
               <Form.Root onSubmit = {handleSubmit}>
                  <Form.Field name = "user_prompt">
                     <Form.Label> Ash Here ... </Form.Label>
                     <Form.Control asChild>
                        <input required />
                     </Form.Control>
                  </Form.Field>

                  <Form.Submit asChild>
                     <button type = "submit" className = "login-button"> {
                        loading ? <><BeatLoader /></> : <> Ask </>
                     }         
                     </button>
                  </Form.Submit>
               </Form.Root>
            </div>
         </div>
      </div>
   )
};

export default Chat;