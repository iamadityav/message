import {React, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addChatMessage} from '../components/redux/chatSlice';
import {launchCamera} from 'react-native-image-picker';

const ChatDetailedScreen = ({navigation}) => {
  const chatMessages = useSelector(state => state.chat.selectedUser);

  const senderImage = chatMessages.image; // state represnts the entire state redux state object . UseSelector has the access to the store's state. state.chat.messages retrieves the messages property from the chat slice.
  const [message, setMessage] = useState('');
  const [data, setData] = useState(chatMessages.chats);

  const dispatch = useDispatch(); //dispatch function is provided by redux store used to send actions to the store.

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatMessages.sender,
    });
  }, []);

  const [photo, setPhoto] = useState({
    assets: [
      {
        fileName: '',
        fileSize: 75704,
        height: 1856,
        type: 'image/jpeg',
        uri: '',
        width: 1392,
      },
    ],
  });

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        OpenCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const OpenCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (!result.didCancel) {
    }
    setPhoto(result);
  };

  function messageInputHandler(text) {
    setMessage(text);
  }

  function sendTextHandler() {
    const image = photo.assets[0].uri;
    console.log('image', image);
    if (message.trim() !== '' || image !== ' ') {
      //checks if message is not empty string after trim the leading and trailing spaces and ensures user has entered non empty content
      dispatch(addChatMessage({message: message, uri: image})); //dispatch function is called and action "addchatMessage" is called
      const temp = [...data];
      setData([...temp, {reciever: {message: message, uri: image}}]);
    }
    setMessage('');
    setPhoto({
      assets: [
        {
          fileName: '',
          fileSize: 75704,
          height: 1856,
          type: 'image/jpeg',
          uri: '',
          width: 1392,
        },
      ],
    });
  }

  const defaultImage = require('../images/Avatar7.jpeg');

  const renderChat = ({item}) => {
    return (
      <View style={styles.maincontainer}>
        {item.send != null ? (
          <View style={styles.sendercontainer}>
            <Image source={senderImage} style={styles.chatImage} />
            <View style={styles.sendertextcontainer}>
              <Text style={styles.sender}>{item.send.message}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.receivercontainer}>
          {item.reciever.uri !== '' ? (
            <View style={styles.receivertextContainer}>
              <Text style={styles.receiver}>{item.reciever.message}</Text>
              <Image
                source={{uri: item.reciever.uri}}
                style={styles.recieverimage}
              />
            </View>
          ) : (
            <View style={styles.receivertextContainer}>
              <Text style={styles.receiver}>{item.reciever.message}</Text>
            </View>
          )}
          <Image source={defaultImage} style={styles.chatImage2} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.containerone}>
      <FlatList
        data={data}
        renderItem={renderChat}
        keyExtractor={(item, index) => `${index}`}
      />
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission();
          }}>
          <View>
            <Icon
              name="camera"
              size={24}
              color="black"
              style={styles.cameraIcon}
            />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Start Typing..."
          style={styles.input}
          onChangeText={messageInputHandler}
          value={message}
        />
        <Icon
          name="send"
          size={24}
          color="black"
          style={styles.cameraIcon}
          onPress={sendTextHandler}
        />
      </View>
    </View>
  );
};

export default ChatDetailedScreen;

const styles = StyleSheet.create({
  maincontainer: {
    padding: 5,
    flex: 1,
  },
  receivertextContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#c1c1c1',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 320,
    marginRight: 10,
    minHeight: 40,
    flex: 1,
  },
  sendertextcontainer: {
    paddingHorizontal: 20,
    backgroundColor: '#c1c1c1',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 320,
    marginLeft: 10,
    minHeight: 40,
  },
  sender: {
    fontSize: 16,
    color: '#000000',
    margin: 8,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  receiver: {
    fontSize: 16,
    color: '#000000',
    margin: 8,
  },
  chatImage: {
    paddingBottom: 8,
    marginBottom: 8,
    flexDirection: 'row',
    paddingTop: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  chatImage2: {
    paddingBottom: 8,
    marginBottom: 8,
    flexDirection: 'row',
    paddingTop: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  sendercontainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '70%',
  },
  receivercontainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '70%',
  },
  input: {
    height: 40,
    marginHorizontal: 16,
    marginBottom: 36,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 12,
    flex: 1,
  },
  containerone: {
    flex: 1,
  },
  cameraIcon: {
    margin: 8,
  },
  textContainer: {
    flexDirection: 'row',
  },
  recieverimage: {
    flexDirection: 'row',
    paddingTop: 10,
    width: '100%',
    height: 100,
    //borderRadius: 50,
  },
});
