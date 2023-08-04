import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProfileImage = () => {

    const userImage = useSelector(state => state.chat.selectedUser);

    const image = userImage.image;
    console.log('Image', userImage);

  return (
    <View style={style.conatiner}>
          
          <Image source={image} style={style.image}  />
    </View>
  )
}

export default ProfileImage;

const style = StyleSheet.create({
    image: {
        width: '100%',
        maxHeight:400,
    },
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    }
})