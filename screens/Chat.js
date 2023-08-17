import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {React, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Message_Data} from '../DummyData/DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedUser} from '../components/redux/chatSlice';

const Chat = () => {
  const dispatch = useDispatch(); //dispatch function is provided by redux store used to send actions to the store.

  const chatMessages = useSelector(state => state.chat.messages);

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessageData, setFilteredMessageData] = useState(Message_Data);

  const renderMessageItem = ({item}) => {
    function onPressHandler() {
      dispatch(setSelectedUser(item.id));
      navigation.navigate('ChatDetailedScreen');
    }
    function onClickHandler() {
      dispatch(setSelectedUser(item.id));
      navigation.navigate('ProfileImage');
    }
    return (
      <SafeAreaView style={styles.messageItem}>
        <TouchableOpacity onPress={onClickHandler}>
          <Image source={item.image} style={styles.messageImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHandler}>
          <View style={styles.messageItem}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.messageText}>{item.Message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderAvatarItem = ({item}) => {
    function onClickAvatar() {
      dispatch(setSelectedUser(item.id));
      navigation.navigate('ChatDetailedScreen', {item});
    }

    return (
      <TouchableOpacity style={styles.avatarContainer} onPress={onClickAvatar}>
        <Image source={item.image} style={styles.avatar} />
        <Text style={styles.name}>{item.sender}</Text>
      </TouchableOpacity>
    );
  };

  const OnChangeTextHandler = value => {
    setSearchQuery(value);
    const filteredData = Message_Data.filter(item =>
      item.sender.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredMessageData(filteredData);
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search"
        onChangeText={OnChangeTextHandler}
        style={styles.input}
      />
      <View>
        <FlatList
          data={filteredMessageData}
          renderItem={renderAvatarItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={filteredMessageData}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingLeft: 6,
    height: 40,
    marginTop: 10,
  },
  chatContainer: {
    backgroundColor: '#c19999',
  },
  AvatarImage: {
    height: 70,
    widht: 70,
  },
  image: {
    resizeMode: 'cover',
  },
  avatar: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 15,
  },
  name: {
    marginTop: 4,
    fontSize: 12,
  },
  messageItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
    flexDirection: 'row',
    paddingTop: 10,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
  },
  messageImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  time: {
    fontSize: 12,
    opacity: 0.4,
  },
});

export default Chat;
