import {createSlice} from '@reduxjs/toolkit';
import {Message_Data} from '../../DummyData/DummyData';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: Message_Data,
  },
  reducers: {
    addChatMessage: (state, action) => {
      //arrow function takes the current 'state' and the dispatched 'action' as arguments. Will execute when 'addChatmessage' is dispatched
      const {sender, message} = action.payload; // contains the data sent with action when it was dispatched. In this case, it is expectedto have a 'sender' and 'message' property.
      const newMessage = {
        reciever:message, // receiver property will be determined based on whether the first message in the 'state.message' array has the same sender as the provided 'sender'. If same the receiver will be set to the name of the sender , otherwise it willl be set to the 'sender'
      };
      const chatIndex = state.messages.findIndex(
        item => item.sender === sender,
      ); //for finding the index of the chat in the 'state.messages' array that matches the provided 'sender'
      if (chatIndex !== -1) {
        state.messages[chatIndex].chats.push(newMessage); //if chat is found , the newMessage will be pushed into the chats array of the matched chat
      }
    },
  },
});

export const {addChatMessage} = chatSlice.actions;
export default chatSlice.reducer;
