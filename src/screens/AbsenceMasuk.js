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
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  StatusBar,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignInHeader from '../components/SignInHeader';
import TextArea from '../components/TextArea';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';

const baseUrl = 'http://sidar-staging.suryoatmojo.my.id';
// const baseUrl = 'http://localhost/sidar-new';
class AbsenceMasuk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      deskripsi: 'ajur gaes ajur 2',
      file: 'content://com.android.providers.media.documents/document/document%3A17',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  selectOneFile = async () => {
    var uri;
    var type;
    var name;
    var size;
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.allFiles],
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      console.log(res[0]);
      console.log(res[0].name);
      console.log(res[0].uri);

      this.setState({file: res[0].uri});
      //Printing the log realted to the file
      // console.log('res : ' + JSON.stringify(res, null, 2));
      // console.log('URI : ' + res[0].uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      // setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  submitData = () => {
    console.log('tombol simpan mengirimkan data');
    console.log('token');
    // console.log(this.props.route.params.token);

    // let username = this.state.username;
    // let password = this.state.password;
    // bodyFormData.append('username', 'suryoatm');
    // bodyFormData.append('password', '085649224822');

    var bodyFormData = new FormData();
    bodyFormData.append('deskripsi', this.state.deskripsi);
    bodyFormData.append('file', this.state.file);

    axios({
      method: 'post',
      url: `${baseUrl}/api/sidar_kritik/add`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
        'X-Token':
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE2NTg5ODM2MjAsImV4cCI6MTY1OTA3MDAyMH0.FOYwvJXZ7vkOUjsJZuvy66xT51IgRRYxKcyMN9rRMB8',
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

  render() {
    return (
      <View style={{backgroundColor: '#373737', flex: 1}}>
        {/* <View style={{flex: 1}}> */}
        <View
          style={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: '#393939',
            padding: 20,
          }}>
          <TouchableOpacity onPress={this.toggleOpen}>
            <Icon name="cog" size={30} color="#ffffff" />
            {/* <Text
                    style={{
                      color: '#000000',
                      fontsize: 9,
                    }}>
                    gear
                  </Text> */}
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
          {/* <Text style={{color: '#ffffff', fontSize: 12}}>DAR</Text> */}
        </View>
        {/* </View> */}

        <View
          style={{
            marginTop: 10,
            marginBottom: 5,
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
              marginTop: 10,
            }}>
            Laporan Aktivitas Harian
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
            }}></Text>
        </View>

        {/* <TextArea placeholder="Description" /> */}

        <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
          <View style={styles.container}>
            {/* <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          /> */}
            <Text>ABSENCE MASUK</Text>
            {/* <Text style={styles.boldText}>{locationStatus}</Text> */}

            <SafeAreaView style={{flex: 1}}>
              <Text style={styles.titleText}>
                Example of File Picker in React Native
              </Text>
              <View style={styles.container}>
                {/*To show single file attribute*/}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={this.selectOneFile}>
                  {/*Single file selection button*/}
                  <Text style={{marginRight: 10, fontSize: 19}}>
                    Click here to pick one file
                  </Text>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                    }}
                    style={styles.imageIconStyle}
                  />
                </TouchableOpacity>
                {/*Showing the data of selected Single file*/}

                <View
                  style={{
                    backgroundColor: 'grey',
                    height: 2,
                    margin: 10,
                  }}
                />
                {/*To multiple single file attribute*/}
              </View>
            </SafeAreaView>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={{
            marginBottom: 40,
            backgroundColor: '#272727',
            paddingVertical: 15,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9,
            elevation: 2,
          }}
          onPress={this.submitData}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'light'}}>
            Simpan
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: '#2b2b2b',
            flexDirection: 'row',
            paddingVertical: 10,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('LaporanDar')}>
            <Icon name="chart-bar" size={20} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
                fontsize: 9,
              }}>
              Laporan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
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
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Dar')}>
            <Icon name="book" size={20} color="#ffffff" />
            <Text
              style={{
                color: '#ffffff',
                fontsize: 9,
              }}>
              DAR
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
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default AbsenceMasuk;
