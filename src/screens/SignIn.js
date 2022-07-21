import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import SignInHeader from '../components/SignInHeader';
import {useNavigation} from '@react-navigation/native';

const baseUrl = 'https://reqres.in';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#2b2b2b'}}>
      <SignInHeader title="SIDAR" description="Login ke aplikasi Sidar" />

      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
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
      <TouchableOpacity
        style={{marginTop: 20, marginRight: 20}}
        onPress={() => navigation.navigate('LupaPassword')}>
        <Text style={{textAlign: 'right', fontWeight: 'bold', color: 'white'}}>
          Lupa Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 40,
          backgroundColor: '#f98441',
          paddingVertical: 15,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 9,
          elevation: 2,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
          Sign In
        </Text>
      </TouchableOpacity>
      {/* <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 40}}>
        Atau login dengan
      </Text> */}

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 40,
        }}></View>

      <TouchableOpacity
        style={{marginTop: 20, marginRight: 20}}
        onPress={() => navigation.navigate('Register')}>
        <Text
          style={{color: '#c4c4c4', textAlign: 'center', fontWeight: 'bold'}}>
          Bukan Member?{' '}
          <Text style={{color: '#c4c4c4'}}>Registrasi Disini</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
