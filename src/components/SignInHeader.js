import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

const SignInHeader = props => {
  return (
    <View style={{marginTop: 40, marginBottom: 10}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 237, height: 65, borderRadius: 25}}
          source={require('../images/indraco.png')}
        />
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#f98441',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          color: '#f98441',
          textAlign: 'center',
          fontSize: 16,
        }}>
        {props.description}
      </Text>
    </View>
  );
};

export default SignInHeader;
