import React from 'react';
import {View, Text} from 'react-native';
const Title = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#373248',
          textAlign: 'center',
        }}>
        SIDAR
      </Text>
      <Text style={{textAlign: 'center'}}>
        SYSTEM INFORMATION DAILY ACTIVITY REPORT
      </Text>
      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          marginHorizontal: 50,
        }}></Text>
    </View>
  );
};

export default Title;
