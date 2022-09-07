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

import React, {Fragment, Component} from 'react';
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
  Dimensions,
  LogBox,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignInHeader from '../components/SignInHeader';
import TextArea from '../components/TextArea';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
// import * as ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const baseUrl = 'http://new.sidar.id';
// const baseUrl = 'http://localhost/sidar-new';
class AbsenceMasuk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      deskripsi: 'serangan fajar qwerty',
      file: 'file:///data/user/0/com.sidarmobilereact/cache/rn_image_picker_lib_temp_5e66fc3d-58a6-4b64-bf3a-1ae43179bb03.jpg',
      uri: '',
      type: '',
      name: '',
      filepath: {
        data: '',
        uri: '',
      },
      filePath: '',
      fileData: '',
      fileUri: '',
      currentLongitude: '',
      currentLatitude: '',
      locationStatus: 'PRESS REFRESH GPS TO GET COORDINATE',
      status_simpan: true,
      token: '',
      datalogin: [],
      iduser: '',
      place: '',
      note: '',
    };
  }

  showLoader() {
    this.setState({isVisible: true});
  }

  hideLoader() {
    this.setState({isVisible: false});
  }

  chooseImage = () => {
    // alert('Canceled from single doc picker');
    launchImageLibrary(
      {
        skipBackup: true,
        path: 'images',
      },
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = {uri: response.uri};
          console.log('test disini');
          console.log(response.assets[0]);
          console.log(response.assets[0].uri);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // alert(JSON.stringify(response));s
          console.log('response', JSON.stringify(response));
          this.setState({
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
            filePath: response,
            fileData: response.assets[0],
            fileUri: response.assets[0].uri,
          });
        }
      },
    );
  };

  lCamera = () => {
    let options = {
      quality: 1,
      maxWidth: 400,
      maxHeight: 400,
      allowsEditing: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        console.log('test disini');
        console.log(response.assets[0]);
        console.log(response.assets[0].uri);

        console.log('response', JSON.stringify(response));
        this.setState({
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
          filePath: response,
          fileData: response.assets[0],
          fileUri: response.assets[0].uri,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/dummy.png')}
          style={styles.images}
        />
      );
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../assets/galeryImages.jpg')}
          style={styles.images}
        />
      );
    }
  }

  componentDidMount() {
    console.disableYellowBox = true;
    console.disableYellowBox = ['Warning: Each', 'Warning: Failed'];

    LogBox.ignoreLogs(['Require cycle:']);
    LogBox.ignoreAllLogs();
    AsyncStorage.getItem('@storage_Key').then(value => {
      // console.log('coba get value token');
      // console.log(value);
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
          // console.log('ini profile user');
          // console.log(responseprofile.data);
          // console.log('ini axios di dlam sync');
          // console.log(responseprofile.data.data.user.id_karyawan);
          // console.log(this.state.token);

          this.setState({
            datalogin: responseprofile.data.data.user,
            iduser: responseprofile.data.data.user.id_karyawan,
          });
          let iduser = responseprofile.data.data.user.id_karyawan;
          //ambild data di server bisa dilakukan disini
          axios({
            method: 'get',
            url: `${baseUrl}/api/sidar_masterkaryawan/detail/?id=${iduser}`,
            headers: {
              'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
              'X-Token': value,
            },
          })
            .then(response => {
              console.log(
                '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
              );

              console.log(response.data.data.sidar_masterkaryawan);
              console.log(response.data.message);

              console.log('check');
              this.setState({
                statusdarthisday:
                  response.data.data.sidar_masterkaryawan[0].statusdarthisday,
              });
              console.log(this.state.statusdarthisday[4]);
              this.lCamera();
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    });

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        this.getOneTimeLocation();
        this.subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
          } else {
            this.setState({locationStatus: 'Permission Denied'});
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }

  componentWillUnmount() {
    // this.unsubsribe();
  }

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
      console.log(res[0].type);
      const name = decodeURIComponent(res[0].uri);
      // if (name.startsWith(CONTENT_PREFIXES.RESILLIO_SYNC)) {
      //   const realPath = name.replace(CONTENT_PREFIXES.RESILLIO_SYNC, '');
      // }
      console.log(name);
      // console.log(realPath);

      this.setState({file: name});
      this.setState({uri: res[0].uri});
      this.setState({name: res[0].name});
      this.setState({size: res[0].size});

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

  getOneTimeLocation = () => {
    // alert('masuk');
    this.setState({locationStatus: 'PLEASE WAIT...REFRESH LOCATION'});
    console.log('test');
    console.log(this.state.locationStatus);

    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        this.setState({locationStatus: 'YOU ARE HERE'});

        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        this.setState({currentLongitude: currentLongitude});

        //Setting Longitude state
        this.setState({currentLatitude: currentLatitude});

        console.log('longitude');
        console.log(currentLongitude);
        console.log('latitude');
        console.log(currentLatitude);

        axios({
          method: 'get',
          // url: `${baseUrl}/api/sidar_dar/all`,
          url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLongitude},${currentLatitude}.json?types=poi&access_token=pk.eyJ1Ijoic2dpd2ViIiwiYSI6ImNrc3E1bDFpazA5cnIyd252amJ6dmV6YzgifQ.eGVUcbmYW0T0vZ3rfZkEFw`,
          // url: `${baseUrl}/api/sidar_dar/detail?option=2&iduser=${iduser}`,
          // headers: {
          //   'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
          //   'X-Token': this.state.token,
          // },
        })
          .then(response => {
            console.log(response.data);
            console.log('space');
            console.log('space');
            console.log(response.data.features[0].context);

            console.log('ini isinya place');
            console.log(response.data.features[0].context[2].text);
            var text = '';
            var i = 0;
            while (i < response.data.features[0].context.length) {
              text += response.data.features[0].context[i].text + '\r\n';
              i++;
            }
            console.log(text);
            this.setState({place: text});
          })
          .catch(function (err) {
            console.log(err);
            // this.setState({status_loading: false});
          });
      },
      error => {
        this.setState({locationStatus: error.message});
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  subscribeLocationLocation = () => {
    Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        console.log('refresh GPS');
        this.setState({locationStatus: 'You are Here'});
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({currentLongitude: currentLongitude});

        //Setting Longitude state
        this.setState({currentLatitude: currentLatitude});
        console.log('longitude');
        console.log(currentLongitude);
        console.log('latitude');
        console.log(currentLatitude);
      },
      error => {
        this.setState({locationStatus: error.message});
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  submitData = () => {
    this.setState({status_simpan: false});
    console.log('tombol simpan mengirimkan data');
    console.log('token');
    console.log(this.state.fileData);

    var bodyFormData = new FormData();
    bodyFormData.append('iduser', this.state.iduser);
    bodyFormData.append('status_absen', 'absen masuk');
    bodyFormData.append('latitude', this.state.currentLatitude);

    bodyFormData.append('longitude', this.state.currentLongitude);
    bodyFormData.append('note', this.state.note);
    bodyFormData.append('file', {
      // name: 'file',
      name: this.state.name,
      type: 'image/jpeg',
      uri: this.state.uri,
    });

    console.log('longitude');
    console.log(this.state.currentLongitude);
    console.log('latitude');
    console.log(this.state.currentLatitude);
    console.log('name');
    console.log(this.state.name);
    console.log('type');
    console.log(this.state.type);
    console.log('uri');
    console.log(this.state.uri);
    console.log('file');
    console.log(bodyFormData._parts[1]);

    axios({
      method: 'post',
      url: `${baseUrl}/api/sidar_absenluarkota/add`,
      // url: `${baseUrl}/api/sidar_absenluarkota/add`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
        'X-Token': this.state.token,
      },
    })
      .then(response => {
        console.log('proses simpan');
        console.log('isi token');
        console.log(this.state.login);

        if (response.data.status == true) {
          alert('berhasil');
          this.setState({status_simpan: true});

          try {
            this.props.navigation.navigate('HomeScreen');
          } catch (error) {
            console.error(error);
          }
        } else {
          alert('periksa kembali inputan  anda test');
          this.setState({status_simpan: true});
        }
      })
      .catch(error => {
        alert('periksa kembali inputan anda gaes');
        console.log('Error:' + error.message);
        this.setState({status_simpan: true});
      });
    // .catch(function (err) {
    //   console.log(err);
    //   alert('periksa kembali inputan anda gaes');
    //   try {
    //     this.setState({status_simpan: false});
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });
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
      <View style={{backgroundColor: '#f8f6f4', flex: 1}}>
        {/* <View style={{flex: 1}}> */}

        <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
          <SafeAreaView>
            {/* <View
              style={{
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: '#393939',
                padding: 10,
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
                ABSEN MASUK
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                }}></Text>
            </View> */}

            <View
              style={{
                marginTop: 30,
                // borderBottomRightRadius: 20,
                // borderBottomLeftRadius: 20,
                backgroundColor: '#494e75',
                padding: 15,
              }}>
              {/* <TouchableOpacity onPress={this.toggleOpen}>
                <Icon name="cog" size={30} color="#ffffff" />
              </TouchableOpacity> */}
              {/* <Text
                style={{
                  color: '#ffffff',
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginTop: 25,
                }}>
                SIDAR - DAR
              </Text> */}
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

            {/* <View
              style={{
                marginTop: 5,
                padding: 10,
                backgroundColor: '#2b2b2b',
                paddingVertical: 10,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                }}>
                Hi, {this.state.datalogin.username}
                {'\n'}Anda terakhir login pada,{' '}
                {this.state.datalogin.last_login}
              </Text>
            </View> */}

            <View style={styles.body}>
              <Text
                style={{
                  color: '#4a4f74',
                  textAlign: 'center',
                  fontSize: 12,
                  padding: 5,
                  fontWeight: 'bold',
                }}>
                PICK IMAGES FROM CAMERA
              </Text>
              {/* <Image source={{uri: this.state.fileUri}} style={styles.images} /> */}
              {/* <Image source={require('../images/loading.gif')} /> */}
              {/* <Image
                source={require('../images/loading-slow-net.gif')}
                style={{width: 41, height: 50}}
              /> */}
              <View style={[styles.ImageSections, {alignItems: 'center'}]}>
                {/* <View>
                  {this.renderFileData()}
                  <Text style={{textAlign: 'center'}}>Base 64 String</Text>
                </View> */}
                <View>
                  {this.renderFileUri()}
                  {/* <Text style={{textAlign: 'center'}}>File Uri</Text> */}
                </View>
              </View>
              <View style={styles.btnParentSection}>
                {/* <TouchableOpacity
                  onPress={this.chooseImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Choose File</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={this.lCamera}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Directly Launch Camera</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={this.launchImageLibrary}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>
                    Directly Launch Image Library
                  </Text>
                </TouchableOpacity> */}
              </View>
              <View style={styles.btnParentSection}>
                <Text
                  style={{fontSize: 20, color: '#812626', fontWeight: 'bold'}}>
                  {this.state.locationStatus}
                </Text>

                {/* <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                    fontSize: 20,
                  }}>
                  LONGITUDE : {this.state.currentLongitude}
                </Text> */}
                {/* <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                    fontSize: 20,
                  }}>
                  LATITUDE : {this.state.currentLatitude}
                </Text> */}
              </View>
            </View>
          </SafeAreaView>

          <View style={styles.container}>
            {/* <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          /> */}
            {/* <Text>ABSENCE MASUK</Text> */}
            {/* <Text style={styles.boldText}>{locationStatus}</Text> */}
          </View>

          <View style={{height: 200, flexDirection: 'row'}}>
            <WebView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginTop: 10,
                // width: '50%',
              }}
              source={{
                html:
                  '<iframe width="100%" height="100%" src="https://maps.google.com/maps?q=' +
                  this.state.currentLatitude +
                  ', ' +
                  this.state.currentLongitude +
                  '&z=20&output=embed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadStart={() => this.showLoader()}
              onLoad={() => this.hideLoader()}
            />
            <View style={{width: '50%', marginTop: 10, marginHorizontal: 5}}>
              <TouchableOpacity
                style={[styles.btnAbsence, {backgroundColor: '#4a4f74'}]}
                onPress={this.getOneTimeLocation}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  REFRESH GPS
                </Text>
              </TouchableOpacity>
              <Text style={{color: '#393939'}}>Place : {this.state.place}</Text>
            </View>
          </View>
        </ScrollView>
        {/* <TouchableOpacity
          style={[styles.btnAbsence, {backgroundColor: '#525252'}]}
          onPress={this.getOneTimeLocation}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            REFRESH GPS
          </Text>
        </TouchableOpacity> */}

        <TextInput
          onChangeText={text => this.setState({note: text})}
          style={{
            // marginHorizontal: 5,
            backgroundColor: '#FFFFFF',
            marginBottom: 5,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
            color: '#252525',
          }}
          placeholderTextColor="#292929"
          placeholder="Note"
        />

        {this.state.status_simpan == true ? (
          <TouchableOpacity
            style={[styles.btnAbsence, {backgroundColor: '#4a4f74'}]}
            onPress={this.submitData}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              SIMPAN
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../images/loading-slow-net.gif')}
              style={{width: 41, height: 50}}
            />
          </View>
        )}

        <View
          style={{
            backgroundColor: '#494e75',
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
              this.props.navigation.navigate('DrawerCuti', {
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: '#f8f6f4',
    justifyContent: 'center',
    // borderRadius: 10,

    // borderColor: 'black',
    // borderWidth: 1,
    marginTop: 10,
    // height: Dimensions.get('screen').height - 20,
    // width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 180,
    height: 270,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 5,
  },
  btnSection: {
    width: 180,
    height: 40,
    backgroundColor: '#ffcc7c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },

  btnAbsence: {
    marginBottom: 10,
    paddingVertical: 10,
    // marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 9,
    elevation: 2,
  },
});

export default AbsenceMasuk;
