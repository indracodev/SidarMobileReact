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
  StatusBar,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://new.sidar.id';
// const baseUrl = 'http://localhost/sidar-new';

// var divisi = [];

var cobavar = 'suryo';

class Cuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dar: [],
      color: '',
      token: '',
      datalogin: [],
      iduser: '',
    };
  }

  componentDidMount() {
    console.log('token');

    AsyncStorage.getItem('@storage_Key').then(value => {
      console.log('coba get value token');
      console.log(value);
      this.setState({token: value});
      tokens = value;

      axios({
        method: 'get',
        url: `${baseUrl}/api/user/profile`,
        headers: {
          'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
          // 'X-Token':
          //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE2NTk0MjA3MDIsImV4cCI6MTY1OTUwNzEwMn0.rMxjxCy1sBDujijf2aEl1DMEKQJXicMW0itDO_mwnLY',
          'X-Token': value,
        },
      })
        .then(responseprofile => {
          console.log('ini profile user');
          console.log(responseprofile.data);
          console.log('ini axios di dlam sync');
          console.log(responseprofile.data.data.user.id_karyawan);
          console.log(this.state.token);

          this.setState({
            datalogin: responseprofile.data.data.user,
            iduser: responseprofile.data.data.user.id_karyawan,
          });
          let iduser = responseprofile.data.data.user.id_karyawan;
          //ambild data di server bisa dilakukan disini
          axios({
            method: 'get',
            // url: `${baseUrl}/api/sidar_dar/all`,
            url: `${baseUrl}/api/sidar_dar/detail?option=2&iduser=770`,
            headers: {
              'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
              'X-Token': this.state.token,
            },
          })
            .then(response => {
              this.setState({dar: response.data.data.sidar_dar});
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  }

  componentWillUnmount() {
    // this.unsubsribe();
  }

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

  showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Logout', [
      {
        text: 'Yes',
        onPress: () => {
          this.logout();
        },
      },
      {
        text: 'No',
      },
    ]);
  };
  render() {
    return (
      <View style={{backgroundColor: '#ecf0f1', flex: 1}}>
        {/* <View style={{flex: 1}}> */}
        <View
          style={{
            marginTop: 30,
            // borderBottomRightRadius: 20,
            // borderBottomLeftRadius: 20,
            backgroundColor: '#898989',
            padding: 20,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
            }}>
            Hi, {this.state.datalogin.username}
            {/* - {this.state.iduser} */}
            {'\n'}Anda terakhir login pada, {this.state.datalogin.last_login}
            {/* token, {this.state.token} */}
          </Text>
          {/* <Text style={{color: '#ffffff', fontSize: 12}}>DAR</Text> */}
        </View>
        <ScrollView
          style={{flexDirection: 'column', marginBottom: 20, marginTop: 20}}>
          <View>
            <Text
              style={{
                textAlign: 'center', // <-- the magic
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 0,
                color: '#d68b8b',
              }}>
              {'PENGAJUAN CUTI'}
              {'\n'} {'\n'}
              {'MAAF, FITUR MASIH DALAM TAHAP PENGEMBAGAN'}
            </Text>
          </View>

          {/* <TouchableOpacity
            style={{
              marginBottom: 10,
              backgroundColor: '#797979',
              paddingVertical: 15,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              elevation: 2,
            }}
            onPress={() =>
              this.props.navigation.navigate('DrawerListCutiStaff', {
                data: this.state.datalogin,
                token: this.state.token,
              })
            }>
            <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'light'}}>
              Cuti (In Progress)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 10,
              backgroundColor: '#797979',
              paddingVertical: 15,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              elevation: 2,
            }}
           
          >
            <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'light'}}>
              Sakit (Next New Feature)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 10,
              backgroundColor: '#797979',
              paddingVertical: 15,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              elevation: 2,
            }}
          
          >
            <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'light'}}>
              Unpaid Leave (Next New Feature)
            </Text>
          </TouchableOpacity> */}
        </ScrollView>

        <View
          style={{
            backgroundColor: '#fdfffd',
            flexDirection: 'row',
            paddingVertical: 10,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}>
          {/* DAR */}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              this.props.navigation.navigate('DrawerDar', {
                data: this.state.datalogin,
                token: this.state.token,
              })
            }>
            <Icon name="book" size={20} color="#898989" />
            <Text
              style={{
                color: '#898989',
                fontsize: 9,
              }}>
              DAR
            </Text>
          </TouchableOpacity>
          {/* Laporan */}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              this.props.navigation.navigate('DrawerLaporanDar', {
                data: this.state.datalogin,
                token: this.state.token,

                parameter: 'FilterDate',
              })
            }>
            <Icon name="chart-bar" size={20} color="#898989" />
            <Text
              style={{
                color: '#898989',
                fontsize: 9,
              }}>
              Laporan
            </Text>
          </TouchableOpacity>
          {/* Home */}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('DrawerHome')}>
            <Icon name="home" size={25} color="#898989" />
            <Text
              style={{
                color: '#898989',
                fontsize: 9,
              }}>
              Home
            </Text>
          </TouchableOpacity>

          {/* Cuti */}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              this.props.navigation.navigate('DrawerCuti', {
                data: this.state.datalogin,
                token: this.state.token,
              })
            }>
            <Icon name="ban" size={20} color="#898989" />
            <Text
              style={{
                color: '#898989',
                fontsize: 9,
              }}>
              Cuti
            </Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.showConfirmDialog}>
            <Icon name="sign-out-alt" size={20} color="#898989" />
            <Text
              style={{
                color: '#898989',
                fontsize: 9,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewheader: {
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#2b2b2b',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  viewbody: {
    backgroundColor: '#2b2b2b',
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
  },
  textmin: {
    color: '#ffffff',
    fontSize: 15,
  },
  textbody: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textstatus: {
    borderRadius: 50,
    paddingHorizontal: 5,
    width: 75,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default Cuti;
