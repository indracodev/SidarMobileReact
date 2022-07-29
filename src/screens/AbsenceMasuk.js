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
// import * as ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const baseUrl = 'http://sidar-staging.suryoatmojo.my.id';
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
    };
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

    // console.log(test);

    // You can also use as a promise without 'callback':
    // const result = await launchImageLibrary({
    //         skipBackup: true,
    //         path: 'images',
    //       });
  };

  lCamera = () => {
    // const test = launchCamera({
    //   skipBackup: true,
    //   path: 'images',
    // });

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // alert('haaiiii');
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

  submitData = () => {
    console.log('tombol simpan mengirimkan data');
    console.log('token');
    console.log(this.state.fileData);
    // console.log(this.props.route.params.token);

    // let username = this.state.username;
    // let password = this.state.password;
    // bodyFormData.append('username', 'suryoatm');
    // bodyFormData.append('password', '085649224822');

    var bodyFormData = new FormData();
    bodyFormData.append('deskripsi', 'yoggi');
    bodyFormData.append('file', {
      // name: 'file',
      name: this.state.name,
      type: 'image/jpeg',
      uri: this.state.uri,
    });
    // bodyFormData.append('file', this.state.fileData);
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
      url: `${baseUrl}/api/sidar_kritik/add`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
        'X-Token':
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE2NTkwNjQwNjEsImV4cCI6MTY1OTE1MDQ2MX0.350MvthNRDpcGZnYoayZoORSS7G0pityYCw-nes7xKQ',
      },
    })
      .then(response => {
        // console.log(response.data.status);
        // console.log(response.data.data.username);
        // console.log(response.data.token);
        // console.log(this.state.username);
        // console.log(this.state.password);
        if (response.data.status == true) {
          alert('berhasil');
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
          {/* <Image
            source={uri(
              'content://com.android.providers.media.documents/document/image:307420',
            )}
          /> */}
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
          <SafeAreaView>
            <View style={styles.body}>
              <Text
                style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
                Pick Images from Camera & Gallery
              </Text>
              <View style={[styles.ImageSections, {alignItems: 'center'}]}>
                <View>
                  {this.renderFileData()}
                  <Text style={{textAlign: 'center'}}>Base 64 String</Text>
                </View>
                <View>
                  {this.renderFileUri()}
                  <Text style={{textAlign: 'center'}}>File Uri</Text>
                </View>
              </View>

              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.chooseImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Choose File</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.lCamera}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Directly Launch Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.launchImageLibrary}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>
                    Directly Launch Image Library
                  </Text>
                </TouchableOpacity>
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
            <Text>ABSENCE MASUK</Text>
            {/* <Text style={styles.boldText}>{locationStatus}</Text> */}

            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
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
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AbsenceMasuk;
