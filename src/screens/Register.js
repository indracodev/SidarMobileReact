import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import SignInHeader from '../components/SignInHeader';

import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ulangiPassword, setUlangiPassword] = useState('');

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
      <SignInHeader
        title="Registrasi"
        description="Silakan Masukkan Data Diri Anda"
      />

      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Email Anda"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Password Anda"
        secureTextEntry={true}
      />
      <TextInput
        value={ulangiPassword}
        onChangeText={text => setUlangiPassword(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Ulang Password Anda"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{marginTop: 20, marginRight: 20}}
        onPress={() => navigation.navigate('LupaPassword')}>
        <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
          Lupa Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 40,
          backgroundColor: '#03a9f4',
          paddingVertical: 15,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 9,
          elevation: 2,
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
          Registrasi
        </Text>
      </TouchableOpacity>
      {/* <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 40}}>
        Atau registrasi dengan
      </Text> */}

      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 40}}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            paddingVertical: 10,
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            elevation: 2,
          }}>
          <Image
            source={require('../images/google.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            paddingVertical: 10,
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            elevation: 2,
          }}>
          <Image
            source={require('../images/facebook.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            paddingVertical: 10,
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            // marginRight: 10,
          }}>
          <Image
            source={require('../images/apple.png')}
            style={{width: 25, height: 35}}
          />
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity
        style={{marginTop: 20, marginRight: 20}}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          Sudah Member? <Text style={{color: '#03a9f4'}}>Login Disini</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
