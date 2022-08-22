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
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignInHeader from '../components/SignInHeader';
import TextArea from '../components/TextArea';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

const baseUrl = 'http://new.sidar.id';
// const dateDropdownRef = useRef();
// const baseUrl = 'http://localhost/sidar-new';
class Dar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      datalogin: [],
      iduser: '',

      id: '',
      // id_user: '',
      namakaryawan: '',
      nodar: '',
      ke: '',
      namacc1: '',
      namacc2: '',
      namacc3: '',
      namacc4: '',
      namacc5: '',
      ke2: '',
      ke3: '',
      ke4: '',
      ke5: '',
      sudahbaca: '',
      tanggaldar: '',
      tanggal: '',
      jam: '11:51',
      status: '',
      colorstatus: '',
      activity: 'tanggal 27 ini dari mobile',
      result: 'tanggal 27 ini dari mobile',
      plan: 'tanggal 27 ini dari mobile',
      tag: '',
      file: '',
      periodetanggaldar: [],
    };
  }

  componentDidMount() {
    // this.unsubsribe = this.props.navigation.addListener('focus', () => {

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
          console.log(responseprofile.data.tglhariini);
          console.log(responseprofile.data.statusdar);
          console.log(responseprofile.data.periodetanggaldar);
          console.log('ini axios di dlam sync');
          console.log(responseprofile.data.data.user.id_karyawan);
          console.log(this.state.token);

          if (responseprofile.data.periodetanggaldar.length === 0) {
            console.log('periode tanggal dar kosong');
            this.setState({tanggaldar: responseprofile.data.tglhariini});
          } else {
            this.setState({
              tanggaldar: responseprofile.data.periodetanggaldar[0],
            });
          }
          this.setState({
            status: responseprofile.data.statusdar,
            periodetanggaldar: responseprofile.data.periodetanggaldar,
            datalogin: responseprofile.data.data.user,
            iduser: responseprofile.data.data.user.id_karyawan,
            tanggal: responseprofile.data.tglhariini,
            // tanggaldar: responseprofile.data.periodetanggaldar[0],
          });
          let iduser = responseprofile.data.data.user.id_karyawan;
          console.log('id_user');
          console.log(iduser);
          console.log(this.state.tanggaldar);
          //ambild data di server bisa dilakukan disini
          axios({
            method: 'get',
            url: `${baseUrl}/api/sidar_dar/detail?option=2&iduser=${iduser}`,
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

    // console.log('hello world');
    // console.log(this.props.route.params.token);
    // console.log(this.props.route.params.data);
    // this.setState({
    //   datalogin: this.props.route.params.data,
    //   token: this.props.route.params.token,
    // });

    // console.log(this.state.token);
    // let iduser = 770;
    //ambild data di server bisa dilakukan disini

    // });
  }

  componentWillUnmount() {
    // this.unsubsribe();
  }

  submitData = () => {
    console.log('tombol simpan mengirimkan data');
    console.log('token');
    // console.log(this.props.route.params.token);

    // let username = this.state.username;
    // let password = this.state.password;
    // bodyFormData.append('username', 'suryoatm');
    // bodyFormData.append('password', '085649224822');

    var bodyFormData = new FormData();
    bodyFormData.append('id', this.state.id);
    // bodyFormData.append('id_user', this.state.id_user);
    bodyFormData.append('id_user', this.state.iduser);
    bodyFormData.append('namakaryawan', this.state.namakaryawan);
    bodyFormData.append('nodar', this.state.nodar);
    bodyFormData.append('ke', this.state.ke);
    bodyFormData.append('namacc1', this.state.namacc1);
    bodyFormData.append('namacc2', this.state.namacc2);
    bodyFormData.append('namacc3', this.state.namacc3);
    bodyFormData.append('namacc4', this.state.namacc4);
    bodyFormData.append('namacc5', this.state.namacc5);
    bodyFormData.append('ke2', this.state.ke2);
    bodyFormData.append('ke3', this.state.ke3);
    bodyFormData.append('ke4', this.state.ke4);
    bodyFormData.append('ke5', this.state.ke5);
    bodyFormData.append('sudahbaca', this.state.sudahbaca);
    bodyFormData.append('tanggaldar', this.state.tanggaldar);
    bodyFormData.append('tanggal', this.state.tanggal);
    bodyFormData.append('jam', this.state.jam);
    bodyFormData.append('status', this.state.status);
    bodyFormData.append('colorstatus', this.state.colorstatus);
    bodyFormData.append('activity', this.state.activity);
    bodyFormData.append('result', this.state.result);
    bodyFormData.append('plan', this.state.plan);
    bodyFormData.append('tag', this.state.tag);
    bodyFormData.append('file', this.state.file);
    axios({
      method: 'post',
      url: `${baseUrl}/api/sidar_dar/add`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
        'X-Token': this.state.token,
      },
    })
      .then(response => {
        // console.log(response.data.status);
        // console.log(response.data.data.username);
        // console.log(response.data.token);
        // console.log(this.state.username);
        // console.log(this.state.password);
        if (response.data.status == true) {
          this.props.navigation.dispatch(
            StackActions.replace('LaporanDar', {
              // data: response.data.data,
              // token: response.data.token,
            }),
          );
        } else {
          alert('periksa kembali inputan  anda');
        }
      })
      .catch(function (err) {
        console.log(err);
        alert('periksa kembali inputan anda');
      });
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
        {/* <View
          style={{
            marginTop: 10,
            marginBottom: 5,
            marginHorizontal: 5,
            backgroundColor: '#2b2b2b',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              marginVertical: 5,
            }}>
            Laporan Aktivitas Harian
          </Text>
        </View> */}

        <View
          style={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: '#393939',
            padding: 15,
          }}>
          {/* <TouchableOpacity onPress={this.toggleOpen}>
                <Icon name="cog" size={30} color="#ffffff" />
              </TouchableOpacity> */}
          <Text
            style={{
              color: '#ffffff',
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            SIDAR - DAR
          </Text>
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
        </View>

        {/* <View
          style={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: '#393939',
            padding: 20,
          }}>
          <TouchableOpacity onPress={this.toggleOpen}>
            <Icon name="cog" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            INDRACO - SIDAR
          </Text>
        </View> */}

        {/* <View
          style={{
            marginTop: 5,
            padding: 10,
            backgroundColor: '#f9ffff',
            paddingVertical: 10,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
          }}>
          <Text
            style={{
              color: '#393939',
              fontSize: 12,
            }}>
            Hi, {this.state.datalogin.username}
            {'\n'}Anda terakhir login pada, {this.state.datalogin.last_login}
            {'\n'}
          </Text>
        </View> */}

        {/* <TextArea placeholder="Description" /> */}

        <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
          {this.state.periodetanggaldar.length === 0 ? (
            <View
              style={{
                marginHorizontal: 5,
                marginVertical: 10,
                paddingLeft: 10,
                backgroundColor: '#9fd68b',
                paddingVertical: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: '#373737'}}>
                Form ini akan mengirim dar pada tanggal :{' '}
                {this.state.tanggaldar}
                {' (Y-M-D)'}
              </Text>
              <Text
                style={{
                  color: '#393939',
                  fontSize: 12,
                  // marginTop: 5,
                }}>
                STATUS DAR :{' '}
                <Text
                  style={{
                    color: 'green',
                  }}>
                  {' '}
                  {this.state.status.toUpperCase()}
                </Text>
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 5,
                marginBottom: 10,
                marginTop: 5,
                padding: 10,
                backgroundColor: '#ffdddd',
                paddingVertical: 10,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                }}>
                WARNING
              </Text>
              <Text
                style={{
                  color: '#393939',
                  fontSize: 12,
                  marginBottom: 5,
                }}>
                Anda Belum Mengisi DAR pada{' '}
                <Text style={{color: 'red'}}>
                  {this.state.periodetanggaldar.length}{' '}
                </Text>
                Periode di bawah ini :
                {/* {'\n'}anda belum mengisi DAR pada tanggal DAR dibawah ini : */}
              </Text>

              <SelectDropdown
                // defaultButtonText={'Pilih Tanggal DAR'}
                defaultValueByIndex={0}
                data={this.state.periodetanggaldar}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  if (index > 0) {
                    alert('pilih tanggal yang terkecil dahulu');
                    this.setState({
                      tanggaldar: this.state.periodetanggaldar[0],
                    });
                    console.log(this.state.tanggaldar);
                  } else {
                    this.setState({tanggaldar: selectedItem});
                    console.log(this.state.tanggaldar);
                  }
                  // this.setState({tanggaldar: selectedItem});
                  // console.log(this.state.tanggaldar);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // this.defaultValueByIndex = 0;
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonStyle={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#d68b8b',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#444',
                }}
                buttonTextStyle={{
                  fontSize: 12,
                  textAlign: 'left',
                  color: 'white',
                }}
                dropdownStyle={{backgroundColor: '#EFEFEF'}}
                rowStyle={{
                  backgroundColor: '#EFEFEF',
                  fontSize: 12,
                  borderBottomColor: '#C5C5C5',
                }}
                rowTextStyle={{fontSize: 12, color: '#444', textAlign: 'left'}}
              />

              <Text
                style={{
                  color: '#393939',
                  fontSize: 12,
                  marginTop: 10,
                }}>
                TANGGAL DAR YANG HARUS DI INPUT TERLEBIH DAHULU {' : '}{' '}
                {this.state.tanggaldar} {'\n'}TANGGAL PENGISIAN DAR {' : '}{' '}
                {this.state.tanggal} {'\n'}
                STATUS DAR :{' '}
                <Text
                  style={{
                    color: 'red',
                  }}>
                  {' '}
                  {this.state.status.toUpperCase()}
                </Text>
              </Text>
            </View>
          )}

          <View
            style={{
              backgroundColor: '#f7ffff',
              padding: 25,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 20,
            }}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Aktifitas Harian"
              placeholderTextColor="#393939"
              numberOfLines={10}
              multiline={true}
              onChangeText={text => this.setState({activity: text})}
            />
          </View>

          <View
            style={{
              backgroundColor: '#f7ffff',
              padding: 25,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 20,
            }}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Result"
              placeholderTextColor="#393939"
              numberOfLines={10}
              multiline={true}
              onChangeText={text => this.setState({result: text})}
            />
          </View>
          <View
            style={{
              backgroundColor: '#f7ffff',
              padding: 25,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 20,
            }}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Plan"
              placeholderTextColor="#393939"
              numberOfLines={10}
              multiline={true}
              onChangeText={text => this.setState({plan: text})}
            />
          </View>

          <TouchableOpacity
            style={{
              marginBottom: 40,
              backgroundColor: '#797979',
              paddingVertical: 15,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              elevation: 2,
            }}
            onPress={this.submitData}>
            <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'light'}}>
              SIMPAN
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Result"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View> */}

        {/* <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Plan"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View> */}

        {/* <TextInput
          multiline={true}
          numberOfLines={10}
          keyboardType="email-address"
          // onChangeText={text => setEmail(text)}
          style={{
            height: 200,
            textAlignVertical: 'top',
            backgroundColor: '#c5c5c5c5',
          }}
          placeholder="Aktivitas Harian"
        /> */}

        {/* <TextInput
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
          placeholder="Result"
        /> */}

        {/* <TextInput
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
          placeholder="Plan"
        /> */}

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
              this.props.navigation.navigate('Dar', {
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
              this.props.navigation.navigate('LaporanDar', {
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
            onPress={() => this.props.navigation.navigate('Home')}>
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
  textAreaContainer: {
    borderColor: '#c5c5c5',
    backgroundColor: '#000000',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    color: '#393939',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Dar;
