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
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  Linking,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignInHeader from '../components/SignInHeader';
import TextArea from '../components/TextArea';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as RNFS from 'react-native-fs';
const baseUrl = 'http://new.sidar.id';

// var width = useWindowDimensions();
// const baseUrl = 'http://localhost/sidar-new';
class Dar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      id_user: '770',
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
      tanggaldar: '2022-07-27',
      tanggal: '2022-07-27',
      jam: '11:51',
      status: '',
      colorstatus: '',
      activity: 'tanggal 27 ini dari mobile',
      result: 'tanggal 27 ini dari mobile',
      plan: 'tanggal 27 ini dari mobile',
      tag: '',
      file: '',
      filePath: '',
    };
  }

  componentDidMount() {
    // const [filePath, setFilePath] = useState('');
  }

  isPermitted = async () => {
    if (Platform.OS === 'android') {
      console.log('its android gaes');
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      alert('i dont know, what is this');
      return true;
    }
  };

  isPermittedread = async () => {
    if (Platform.OS === 'android') {
      console.log('its android gaes');
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'External Storage Read Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Read permission err', err);
        return false;
      }
    } else {
      alert('i dont know, what is this');
      return true;
    }
  };

  createPDF = async () => {
    // alert('test');
    try {
      let permit = await this.isPermitted();
      console.log('permit');
      console.log(permit);

      if (permit) {
        let options = {
          html:
            '<h1 style="text-align: center;"><strong>test yoggi me Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p><p style="font-size:20px">' +
            this.props.route.params.data.activity +
            '</p><hr>' +
            '<h2>Result</h2>' +
            '<p style="font-size:20px">' +
            this.props.route.params.data.result +
            '</p><hr>' +
            '<h2>Plan</h2>' +
            '<p style="font-size:20px">' +
            this.props.route.params.data.plan +
            '</p><hr>',
          fileName: 'test9',
          directory: 'Download',
        };
        console.log(options);
        //   try {
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);

        const pathcp = RNFS.DownloadDirectoryPath;

        console.log(pathcp);

        RNFS.copyFile(
          file.filePath,
          // '/storage/emulated/0/Android/data/com.sidarmobilereact/files/ayam.pdf',
          '/storage/emulated/0/Download/test9.pdf',
        )
          .then(success => {
            alert('File created, check on directory download'); // <--- here RNFS can read the file and returns this
          })
          .catch(err => {
            console.log(err.message, err.code);
            alert('error gaes');
          });
        // console.log(file);
        // alert(file.filePath);

        //   this.setState({filePath: file.filePath});
        // } catch (err) {
        //   console.log(err);
        // }
      } else {
      }
      //alert(permit);
    } catch {}
  };

  openPdf = async () => {
    // alert('open');
    // require the module
    // var RNFS = require('react-native-fs');

    // RNFS.readFile(
    //   '/storage/emulated/0/Android/data/com.sidarmobilereact/files/docsme/test6.pdf',
    //   'ascii',
    // )
    //   .then(res => {
    //     console.log('berhasil');
    //     alert('mlaku gaes');

    //   })
    //   .catch(err => {
    //     console.log(err.message, err.code);
    //     alert('error gaes');
    //   });

    const pathcp = RNFS.DownloadDirectoryPath;

    try {
      let permit = await this.isPermittedread();
      console.log('permit');
      console.log(permit);

      if (permit) {
        RNFS.copyFile(
          '/storage/emulated/0/Android/data/com.sidarmobilereact/files/docsme/test9.pdf',
          '/storage/emulated/0/Android/data/com.sidarmobilereact/files/Ts/',
        )
          .then(success => {
            alert('File copied'); // <--- here RNFS can read the file and returns this
          })
          .catch(err => {
            console.log(err.message, err.code);
            alert('error gaes');
          });
      }
    } catch {}
    // RNFS.exists(
    //   '/storage/emulated/0/Android/data/com.sidarmobilereact/files/docsme/test6.pdf',
    // ).then(status => {
    //   if (status) {
    //     alert('Yay! File exists');
    //   } else {
    //     alert('File not exists');
    //   }
    // });

    // RNFS.exists(
    //   '/storage/emulated/0/Android/data/com.sidarmobilereact/files/docsme/test6.pdf',
    // ).then(success => {
    //   alert('File Exists!'); // <--- here RNFS can read the file and returns this
    // });

    // } catch (errcp) {
    //   console.log(errcp);
    // }
    // RNFS.downloadFile({
    //   fromUrl:
    //     'file://${/storage/emulated/0/Android/data/com.sidarmobilereact/files/docsme/test9.pdf}',
    //   toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
    // }).promise.then(r => {
    //   // this.setState({isDone: true});
    // });

    // alert('habis baca');

    // // get a list of files and directories in the main bundle
    // RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //   .then(result => {
    //     console.log('GOT RESULT', result);

    //     // stat the first file
    //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //   })
    //   .then(statResult => {
    //     if (statResult[0].isFile()) {
    //       // if we have a file, read it
    //       return RNFS.readFile(statResult[1], 'utf8');
    //     }

    //     return 'no file';
    //   })
    //   .then(contents => {
    //     // log the file contents
    //     console.log(contents);
    //   })
    //   .catch(err => {
    //     console.log(err.message, err.code);
    //   });
  };

  componentWillUnmount() {}

  logout = async () => {
    console.log('logout');
    try {
      AsyncStorage.removeItem('@storage_Key');
      try {
        this.props.navigation.navigate('Login');
      } catch (error) {
        console.error(error);
      }
    } catch (e) {
      console.log(e);
    }
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

        <View
          style={{
            marginTop: 30,
            // borderBottomRightRadius: 20,
            // borderBottomLeftRadius: 20,
            backgroundColor: '#898989',
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
              marginTop: 5,
            }}>
            SIDAR - DAR
          </Text> */}
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
            }}>
            Hi, {this.props.route.params.data.namakaryawan}
            {'\n'}
            Nama Divisi : {this.props.route.params.namadivisi}
            {'\n'}Berikut data DAR anda pada tanggal,{' '}
            {this.props.route.params.data.tanggaldar} , diisi pada tanggal{' '}
            {this.props.route.params.data.tanggal}, Jam{' '}
            {this.props.route.params.data.jam}
          </Text>
        </View>
        {/* </View> */}

        {/* <View style={styles.viewheader}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Detail Daily Activity Report
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
            }}></Text>
        </View> */}

        {/* <TextArea placeholder="Description" /> */}

        <WebView
          scalesPageToFit={false}
          nestedScrollEnabled
          originWhitelist={['*']}
          source={{
            html:
              '<h2>Activity</h2>' +
              '<p style="font-size:20px">' +
              this.props.route.params.data.activity +
              '</p><hr>' +
              '<h2>Result</h2>' +
              '<p style="font-size:20px">' +
              this.props.route.params.data.result +
              '</p><hr>' +
              '<h2>Plan</h2>' +
              '<p style="font-size:20px">' +
              this.props.route.params.data.plan +
              '</p><hr>',
          }}
        />
        <Button title="Save As PDF" onPress={() => this.createPDF()} />
        {/* <TouchableOpacity style={{height: 20}} onPress={() => this.createPDF()}>
          <View>
           
            <Text style={styles.textStyle}>Create PDF</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{height: 40}} onPress={() => this.openPdf()}>
          <View style={{color: 'red'}}>
           
            <Text style={{color: 'red'}}>open</Text>
          </View>
        </TouchableOpacity> */}

        {/* <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
          <WebView
            scalesPageToFit={false}
            nestedScrollEnabled
            originWhitelist={['*']}
            source={{
              html:
                '<p style="font-size:40px">' +
                this.props.route.params.data.activity +
                '</p>',
            }}
          />

          <View style={{height: 200, marginHorizontal: 5, marginBottom: 10}}>
            <Text>ACTIVITY</Text>
            <WebView
              scalesPageToFit={false}
              nestedScrollEnabled
              originWhitelist={['*']}
              source={{
                html:
                  '<p style="font-size:40px">' +
                  this.props.route.params.data.activity +
                  '</p>',
              }}
            />
          </View>
          <View style={{backgroundColor: '#fffff2', color: '#292929'}}></View>
        
          <View style={{height: 200, marginHorizontal: 5, marginBottom: 10}}>
            <Text>RESULT</Text>
            <WebView
              nestedScrollEnabled
              originWhitelist={['*']}
              source={{
                html: this.props.route.params.data.result,
              }}
            />
          </View>

          <View style={{height: 200, marginHorizontal: 5, marginBottom: 10}}>
            <Text>PLAN</Text>
            <WebView
              nestedScrollEnabled
              originWhitelist={['*']}
              source={{
                html: this.props.route.params.data.plan,
              }}
            />
          </View>

        
        </ScrollView> */}

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        <View
          style={{
            backgroundColor: '#898989',
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
    fontSize: 12,
  },
  textbody: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Dar;
