import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StatusBar,
  ScrollView,
} from 'react-native';

import Header from '../components/Header';
import Title from '../components/Title';
import LoginRegisterButton from '../components/LoginRegisterButton';
const LoginLanding = () => {
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
        <Header />
        <Title />
        <LoginRegisterButton />
      </View>
    </ScrollView>
  );
};

export default LoginLanding;
