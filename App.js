import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Chat from './screens/Chat';
import ChatDetailedScreen from './screens/ChatDetailedScreen';
import { Provider } from 'react-redux';
import store from './components/redux/store';
const Stack = createStackNavigator(); 

const App = () => {
  return (
    <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ChatDetailedScreen" component={ChatDetailedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App