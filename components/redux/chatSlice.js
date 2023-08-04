import {createSlice} from '@reduxjs/toolkit';
import {Message_Data} from '../../DummyData/DummyData';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedUser:null,
    messages: Message_Data,
  },
  reducers: {
    setSelectedUser: (state,action) => {
      state.selectedUser = state.messages.find(
        item=>item.id===action.payload,
      )   
    },
    addChatMessage: (state, action) => {    //arrow function takes the current 'state' and the dispatched 'action' as arguments. Will execute when 'addChatmessage' is dispatched
      const {message} = action.payload; // contains the data sent with action when it was dispatched. In this case, it is expected to have a 'sender' and 'message' property.
      const newMessage = {
        reciever: message, // receiver property will be determined based on whether the first message in the 'state.message' array has the same sender as the provided 'sender'. If same the receiver will be set to the name of the sender , otherwise it willl be set to the 'sender'
      };
      const chatIndex = state.messages.findIndex( //findIndex is used to search through the array in the state and find the index of an element based on a condition.
        item => item.id === state.selectedUser.id,
      ); //for finding the index of the chat in the 'state.messages' array that matches the provided 'sender'
      if (chatIndex !== -1) {
        state.messages[chatIndex].chats.push(newMessage);
        console.log("skhvbkhs",state.messages[chatIndex].chats)//if chat is found , the newMessage will be pushed into the chats array of the matched chat
      }
    },
  },
  // showProfilePicture: (state,action) => {
  //   return 
  // }
});

export const {addChatMessage,setSelectedUser} = chatSlice.actions;
export default chatSlice.reducer;
