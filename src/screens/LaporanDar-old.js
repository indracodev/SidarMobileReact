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
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://new.sidar.id';
// const baseUrl = 'http://localhost/sidar-new';

var product = [
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'Ucafe', rasa: 'mocachinno'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'Rasa Sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
];

// var divisi = [];

var cobavar = 'suryo';

class LaporanDar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dar: [],
      color: '',
      token: '',
      datalogin: [],
      iduser: '',
      status_loading: true,
    };
  }

  componentDidMount() {
    console.log('token');
    this.setState({status_loading: true});
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
            url: `${baseUrl}/api/sidar_dar/detail?option=2&iduser=${iduser}`,
            headers: {
              'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
              'X-Token': this.state.token,
            },
          })
            .then(response => {
              this.setState({dar: response.data.data.sidar_dar});
              this.setState({status_loading: false});
            })
            .catch(function (err) {
              console.log(err);
              this.setState({status_loading: false});
            });
        })
        .catch(function (err) {
          console.log(err);
          this.setState({status_loading: false});
        });
    });

    // this.unsubsribe = this.props.navigation.addListener('focus', () => {
    //   console.log('ini did mount laporan dar');
    //   console.log(this.props.route.params.token);
    //   axios({
    //     method: 'get',
    //     url: `${baseUrl}/api/sidar_dar/all`,
    //     headers: {
    //       'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
    //       'X-Token': this.props.route.params.token,
    //     },
    //   })
    //     .then(response => {
    //       this.setState({dar: response.data.data.sidar_dar});
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // });
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
        {this.state.status_loading == true ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              height: 100,
            }}>
            <View>
              <Image
                source={require('../images/loading-load.gif')}
                style={{width: 120, height: 120}}
              />
            </View>
          </View>
        ) : (
          <View style={{backgroundColor: '#ecf0f1', flex: 1}}>
            <View
              style={{
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: '#393939',
                padding: 15,
              }}>
              <TouchableOpacity onPress={this.toggleOpen}>
                <Icon name="cogs" size={15} color="#ffffff" />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                INDRACO - SIDAR
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                }}>
                Hi, {this.state.datalogin.username}
                {/* - {this.state.iduser} */}
                {'\n'}Anda terakhir login pada,{' '}
                {this.state.datalogin.last_login}
                {/* token, {this.state.token} */}
              </Text>
            </View>

            <FlatList
              style={{marginTop: 0}}
              data={this.state.dar}
              renderItem={({item, index}) => (
                //styling view
                <TouchableOpacity
                  style={{
                    // backgroundColor: '#60a5f0',
                    backgroundColor: '#f9ffff',
                    marginTop: 10,
                    marginHorizontal: 10,
                    padding: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('DetailLaporanDar', {
                      data: item,
                    })
                  }>
                  {/* <View style={{flex: 1}}></View> */}

                  <Text style={[styles.textstatus, {color: '#393939'}]}>
                    {item.namakaryawan}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          // marginLeft: 5,
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: '#393939',
                        }}>
                        {item.tanggaldar} / {item.jam}
                      </Text>
                    </View>
                    <View>
                      {/* <Icon name="check" size={50} color="rgba(255,255,255,0.5)" /> */}
                      {item.status == '' ? (
                        <Text
                          style={[
                            styles.textstatus,
                            {
                              backgroundColor: item.colorstatus,
                              color: 'white',
                            },
                          ]}>
                          No Data
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.textstatus,
                            {
                              backgroundColor: item.colorstatus,
                              color: 'white',
                            },
                          ]}>
                          {item.status}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <View
          style={{
            backgroundColor: '#2b2b2b',
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
            <Icon name="book" size={20} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
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
              })
            }>
            <Icon name="chart-bar" size={20} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
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
            <Icon name="home" size={25} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
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
              this.props.navigation.navigate('Cuti', {
                data: this.state.datalogin,
                token: this.state.token,
              })
            }>
            <Icon name="ban" size={20} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
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
            <Icon name="sign-out-alt" size={20} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
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

export default LaporanDar;
