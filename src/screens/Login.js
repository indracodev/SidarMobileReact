/**
 * For the brave souls who get this far: You are the chosen ones,
 * the valiant knights of programming who toil away, without rest,
 * fixing our most awful code. To you, true saviors, kings of men,
 * I say this: never gonna give you up, never gonna let you down,
 * never gonna run around and desert you. Never gonna make you cry,
 * never gonna say goodbye. Never gonna tell a lie and hurt you.
 */

/**
 * author : Suryo Atmojo <suryoatm@gmail.com>
 * project : INDRACO-SIDAR
 * Start-date : 23-07-2022
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import SignInHeader from '../components/SignInHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'http://sidar-staging.suryoatmojo.my.id';
// const baseUrl = 'http://localhost/sidar-new';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
    };
  }

  componentDidMount() {
    // alert('didmount');
    try {
      AsyncStorage.getItem('@storage_Key').then(value => {
        // alert('Anda Sudah Perna');
        console.log('coba get value token did mount');
        console.log(value);
        this.setState({token: value});
        tokens = value;

        if (tokens) {
          this.props.navigation.navigate('HomeScreen', {
            // data: res.data.data,
            token: tokens,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    // this.unsubsribe = this.props.navigation.addListener('focus', () => {
    //   console.log(this.state.username);
    //   console.log(this.state.password);
    //   let username = 'suryor';
    //   let password = '123456';

    //   //ambild data di server bisa dilakukan disini
    //   axios({
    //     method: 'get',
    //     url: `${baseUrl}/api/userlogin/?username=${username}&pwd=${password}`,
    //   })
    //     .then(response => {
    //       if (response.data.message == 'success') {
    //         console.log(response.data.data[0].username);
    //       }
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // });
  }

  componentWillUnmount() {
    // this.unsubsribe();
  }

  loginCheck() {
    this.submitData();
    this.redirectPage();
  }

  redirectPage = () => {
    console.log('redirect page');

    // const afterDeleteNavigateAction = StackActions.replace('Home', {});
    // this.props.navigation.dispatch(
    //   StackActions.replace('Home', {
    //     data: response.data.data,
    //     token: response.data.token,
    //   }),
    // );
  };

  submitData = async () => {
    console.log('async storage run value!!');

    console.log('tombollogin mengirimkan data');
    console.log(this.state.username);
    console.log(this.state.password);
    var bodyFormData = new FormData();

    // let username = this.state.username;
    // let password = this.state.password;
    // bodyFormData.append('username', 'suryoatm');
    // bodyFormData.append('password', '085649224822');

    var bodyFormData = new FormData();
    bodyFormData.append('username', this.state.username);
    bodyFormData.append('password', this.state.password);

    try {
      const data = await AsyncStorage.getItem('@storage_Key');
      if (data !== null) {
        console.log(data);
        alert('Error : asynstore not null, please close apps and open again');
        // try {
        //   this.props.navigation.navigate('Home', {
        //     data: res.data.data,
        //     token: res.data.token,
        //   });
        // } catch (error) {
        //   console.error(error);
        // }
        return data;
      }
    } catch (error) {
      console.log(error);
    }

    // bodyFormData.append('username', 'suryoatmojo');
    // bodyFormData.append('password', '123456789');

    try {
      let res = await axios.post(`${baseUrl}/api/user/login`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': '0ED40DE05125623C8753B6D3196C18DE',
        },
      });
      console.log('axios post');
      console.log(res.data.token);
      console.log(res);
      if (res.data.status == true) {
        // console.log(response.data.data.username);
        console.log('response status true');

        try {
          AsyncStorage.removeItem('@storage_Key');
        } catch (e) {
          // remove error
        }

        try {
          AsyncStorage.setItem('@storage_Key', res.data.token);
          // AsyncStorage.setItem('datalog', res.data.data);
          try {
            this.props.navigation.navigate('HomeScreen', {
              data: res.data.data,
              token: res.data.token,
            });
          } catch (error) {
            console.error(error);
          }
        } catch (e) {
          // saving error
        }
        // get Data from Storage

        // navigation.navigate('Home');
        // this.redirectPage();
        // <LocationItem navigation={this.props.navigation.navigate('Home')} />;
      } else {
        console.log('response status false');
        alert('periksa kembali username dan password anda');
      }
    } catch (error) {
      console.log('wasd');
      alert('terjadi kesalahan, periksa kembali username dan password anda');
    }

    // var bodyFormData = new FormData();
    // bodyFormData.append('username', this.state.username);
    // bodyFormData.append('password', this.state.password);
    // const res = await axios({
    //   method: 'post',
    //   url: `${baseUrl}/api/user/login`,
    //   data: bodyFormData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'X-API-KEY': '0ED40DE05125623C8753B6D3196C18DE',
    //   },
    // })
    //   .then(response => {
    //     console.log(response.data.status);
    //     console.log(response.data.data.username);
    //     console.log(response.data.token);
    //     console.log('typenya adalah  :');
    //     console.log(typeof response.data.token);
    //     console.log(this.state.username);
    //     console.log(this.state.password);

    //     if (response.data.status == true) {
    //       // console.log(response.data.data.username);
    //       console.log('response status true');

    //       // this.props.navigation.dispatch(
    //       //   StackActions.replace('Home', {
    //       //     data: response.data.data,
    //       //     token: response.data.token,
    //       //   }),
    //       // );
    //     } else {
    //       alert('periksa kembali username dan password anda');
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     alert('periksa kembali username dan password anda');
    //   });

    // return AsyncStorage.setItem('access_token', res.data.token);

    // try {
    //   AsyncStorage.setItem('@storage_Key', res.data.token);
    // } catch (e) {
    //   // saving error
    // }
    // // get Data from Storage
    // try {
    //   const data = await AsyncStorage.getItem('@storage_Key');
    //   if (data !== null) {
    //     console.log(data);
    //     return data;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // //alert('hiiiii');
    // axios({
    //   method: 'get',
    //     url: `${baseUrl}/api/sidar_dar/all`,
    //     headers: {
    //       'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
    //       'X-Token':
    //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE2NTg4MDYzMDYsImV4cCI6MTY1ODg5MjcwNn0.SWl1DY3iKWNdPn5172GhNHLZmInxwJj42sk_JgW2s8o',
    //     },
    // })
    //   .then(response => {
    //     console.log(response.data.data);
    //     console.log(response.data.data[0]);
    //     console.log(response.data.message);
    //     if (response.data.message == 'success') {
    //       console.log(response.data.data[0].username);
    //       this.props.navigation.dispatch(StackActions.replace('Home'));
    //     } else {
    //       alert('periksa kembali username dan password anda');
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     alert('periksa kembali username dan password anda');
    //   });
  };

  logout = async () => {
    console.log('logout');
    try {
      AsyncStorage.removeItem('@storage_Key');
      try {
        this.props.navigation.navigate('Login');
      } catch (error) {
        console.error(error);
      }
    } catch (e) {}
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#2b2b2b'}}>
        <SignInHeader
          title="SIDAR"
          description="System Information Daily Activity Report"
        />
        <TextInput
          onChangeText={text => this.setState({username: text})}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 20,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
            color: '#252525',
          }}
          placeholder="Masukkan Username Anda"
        />
        <TextInput
          onChangeText={text => this.setState({password: text})}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 10,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
            color: '#252525',
          }}
          placeholder="Masukkan Password Anda"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{marginTop: 20, marginRight: 20}}
          onPress={() => this.props.navigation.navigate('LupaPassword')}>
          <Text
            style={{color: '#FFFFFF', textAlign: 'right', fontWeight: 'bold'}}>
            Lupa Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 40,
            backgroundColor: '#ffffff',
            paddingVertical: 15,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9,
            elevation: 2,
          }}
          // onPress={() => this.props.navigation.navigate('Home')}>
          // onPress={() => {
          //   this.submitData();
          //   this.redirectPage();
          // }}>
          onPress={this.submitData}>
          <Text style={{color: '#393939', fontSize: 18, fontWeight: 'bold'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
