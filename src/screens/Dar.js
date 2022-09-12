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
  Alert,
  Appearance,
  Button,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignInHeader from '../components/SignInHeader';
import TextArea from '../components/TextArea';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import {BottomSheet} from '@rneui/themed';
import {XMath} from '@wxik/core';
import {WebView} from 'react-native-webview';
import DocumentPicker from 'react-native-document-picker';
import {SpeedDial} from '@rneui/themed';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import RNFetchBlob from 'rn-fetch-blob';

import {color} from 'react-native-reanimated';

const baseUrl = 'http://new.sidar.id';

// const dateDropdownRef = useRef();
// const baseUrl = 'http://localhost/sidar-new';
class Dar extends Component {
  richbsActivity = React.createRef();
  richbsResult = React.createRef();
  richbsPlan = React.createRef();
  richTextActivity = React.createRef();
  richTextResult = React.createRef();
  richTextPlan = React.createRef();

  constructor(props) {
    super(props);
    const that = this;
    const windowHeight = Dimensions.get('window').height;
    this.state = {
      open: '',
      token: '',
      datalogin: [],
      iduser: '',

      id: '',
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
      activity: '',
      result: '',
      plan: '',
      tag: '',
      file: '',
      periodetanggaldar: [],
      windowHeight: Dimensions.get('window').height,
      editorHeight: Dimensions.get('window').height - 90,
      disabled: false,
      isVisibleActivity: false,
      isVisibleResult: false,
      isVisiblePlan: false,
      singleFile: null,
    };
    // that.handleChange = that.handleChange;
    // that.handleHeightChange = this.handleHeightChange;
  }

  /**
   * editor change data
   * @param {string} html
   */
  handleChange(html) {
    this.richHTML = html;
    this.setState({a: Math.random});
  }

  /**
   * editor height change
   * @param {number} height
   */
  handleHeightChange(height) {
    console.log('editor height change:', height);
    // alert(height);
  }
  handleFocusActivity = () => {};
  handleFocusResult = () => {};
  handleFocusPlan = () => {};
  handleBlur = () => {
    this.richTextActivity.insertHTML('asd');
  };

  handleChange = () => {
    this.richTextActivity.insertHTML('asd');
  };

  componentDidMount() {
    // this.unsubsribe = this.props.navigation.addListener('focus', () => {

    AsyncStorage.getItem('@activity').then(valueactivity => {
      this.setState({activity: valueactivity});
      this.richTextActivity.current?.setContentHTML(valueactivity);
      // this.richbsActivity.current?.setContentHTML(valueactivity);
    });

    AsyncStorage.getItem('@result').then(valueresult => {
      this.setState({result: valueresult});
      this.richTextResult.current?.setContentHTML(valueresult);
      // this.richbsResult.current?.setContentHTML(valueresult);
    });

    AsyncStorage.getItem('@plan').then(valueplan => {
      this.setState({plan: valueplan});
      this.richTextPlan.current?.setContentHTML(valueplan);
      // this.richbsPlan.current?.setContentHTML(valueplan);
    });

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
  }

  componentWillUnmount() {
    // this.unsubsribe();
  }

  submitData = () => {
    try {
      AsyncStorage.removeItem('@activity');
      AsyncStorage.removeItem('@result');
      AsyncStorage.removeItem('@plan');
    } catch (e) {}

    console.log('tombol simpan mengirimkan data');
    console.log('token');

    var bodyFormData = new FormData();
    bodyFormData.append('id', this.state.id);
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

    if (this.state.singleFile) {
      bodyFormData.append('file', {
        // name: 'file',
        name: this.state.singleFile[0].name,
        type: this.state.singleFile[0].type,
        uri: this.state.singleFile[0].uri,
      });
    } else {
      bodyFormData.append('file', this.state.file);
    }

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
        if (response.data.status == true) {
          console.log('response.data.status');
          console.log(response.data.status);
          // this.props.navigation.dispatch(
          //   StackActions.replace('HomeScreen', {}),
          // );
          alert('berhasil');
          this.props.navigation.navigate('DrawerHome');

          // this.props.navigation.dispatch(
          //   StackActions.replace('HomeScreen', {
          //     // data: response.data.data,
          //     // token: response.data.token,
          //   }),
          // );

          // try {
          // this.props.navigation.navigate('HomeScreen');
          // } catch (error) {
          //   console.error(error);
          // }
        } else {
          console.log('response.data.status');
          console.log(response.data.status);
          alert('periksa kembali inputan  anda');
        }
      })
      .catch(function (err) {
        console.log(err);
        alert('periksa kembali inputan anda');
      });
  };

  dardraft = async () => {
    try {
      AsyncStorage.setItem('@activity', this.state.activity);
      AsyncStorage.setItem('@result', this.state.result);
      AsyncStorage.setItem('@plan', this.state.plan);
      alert('behasil Simpan DAR ke Draft');
    } catch (err) {}
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

  uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);

      let res = await fetch('http://localhost/upload.php', {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      alert('Please Select File first');
    }
  };

  selectFile = async () => {
    console.log('try');

    try {
      console.log('try 2');
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      this.setState({singleFile: res});

      console.log(res);
      console.log(res[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
          <View
            style={{
              marginTop: 30,
              padding: 10,
              backgroundColor: '#ecf0f1',
              display: 'flex',
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                padding: 1,
              }}
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="bars" size={30} color="#000001" />
            </TouchableOpacity>

            <Text
              style={{
                color: '#000001',
                fontSize: 12,
                marginLeft: 20,
                marginTop: 5,
              }}>
              Hi, {this.state.datalogin.username}
              {'\n'}Anda terakhir login pada, {this.state.datalogin.last_login}
            </Text>
          </View>
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

          <BottomSheet modalProps={{}} isVisible={this.state.isVisibleActivity}>
            <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: this.state.editorHeight,
                }}>
                <Button
                  title="Close"
                  onPress={() =>
                    this.setState({
                      isVisibleActivity: false,
                      editorHeight: this.state.windowHeight - 90,
                    })
                  }
                  buttonStyle={styles.button}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'grey',
                    textAlign: 'left',
                  }}>
                  Activity
                </Text>
                <RichEditor
                  ref={this.richbsActivity}
                  initialContentHTML={this.state.activity}
                  initialHeight={this.state.editorHeight}
                  placeholder={'please input content'}
                  containerStyle={{minHeight: 100}}
                  onHeightChange={this.handleHeightChange}
                  onChange={text => {
                    this.setState({activity: text});

                    this.richTextActivity.current?.setContentHTML(
                      this.state.activity,
                    );
                  }}
                  onFocus={() => {
                    var edtheight = this.state.windowHeight / 2;
                    this.handleFocusActivity;
                    this.setState({editorHeight: edtheight});
                    console.log(this.state.editorHeight);
                  }}
                  onBlur={this.handleBlur}
                />
              </View>
              <RichToolbar
                style={[styles.richBar, styles.richBarDark]}
                flatContainerStyle={styles.flatStyle}
                editor={this.richbsActivity}
                disabled={this.state.disabled}
                actions={[
                  actions.undo,
                  actions.redo,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertOrderedList,
                  actions.alignLeft,
                  actions.alignCenter,
                ]}
              />
            </ScrollView>
          </BottomSheet>

          <BottomSheet modalProps={{}} isVisible={this.state.isVisibleResult}>
            <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: this.state.editorHeight,
                }}>
                <Button
                  title="Close"
                  onPress={() =>
                    this.setState({
                      isVisibleResult: false,
                      editorHeight: this.state.windowHeight - 90,
                    })
                  }
                  buttonStyle={styles.button}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'grey',
                    textAlign: 'left',
                  }}>
                  Result
                </Text>
                <RichEditor
                  ref={this.richbsResult}
                  initialContentHTML={this.state.result}
                  initialHeight={this.state.editorHeight}
                  placeholder={'please input content'}
                  containerStyle={{minHeight: 100}}
                  onHeightChange={this.handleHeightChange}
                  onChange={text => {
                    this.setState({result: text});

                    this.richTextResult.current?.setContentHTML(
                      this.state.result,
                    );
                  }}
                  onFocus={() => {
                    var edtheight = this.state.windowHeight / 2;
                    this.setState({editorHeight: edtheight});
                    console.log(this.state.editorHeight);
                  }}
                  onBlur={this.handleBlur}
                />
              </View>
              <RichToolbar
                style={[styles.richBar, styles.richBarDark]}
                flatContainerStyle={styles.flatStyle}
                editor={this.richbsResult}
                disabled={this.state.disabled}
                actions={[
                  actions.undo,
                  actions.redo,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertOrderedList,
                  actions.alignLeft,
                  actions.alignCenter,
                ]}
              />
            </ScrollView>
          </BottomSheet>

          <BottomSheet modalProps={{}} isVisible={this.state.isVisiblePlan}>
            <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: this.state.editorHeight,
                }}>
                <Button
                  title="Close"
                  onPress={() =>
                    this.setState({
                      isVisiblePlan: false,
                      editorHeight: this.state.windowHeight - 90,
                    })
                  }
                  buttonStyle={styles.button}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'grey',
                    textAlign: 'left',
                  }}>
                  Plan
                </Text>
                <RichEditor
                  ref={this.richbsPlan}
                  initialContentHTML={this.state.plan}
                  initialHeight={this.state.editorHeight}
                  placeholder={'please input content'}
                  containerStyle={{minHeight: 100}}
                  onHeightChange={this.handleHeightChange}
                  onChange={text => {
                    this.setState({plan: text});

                    this.richTextPlan.current?.setContentHTML(this.state.plan);
                  }}
                  onFocus={() => {
                    var edtheight = this.state.windowHeight / 2;
                    this.setState({editorHeight: edtheight});
                    console.log(this.state.editorHeight);
                  }}
                  onBlur={this.handleBlur}
                />
              </View>
              <RichToolbar
                style={[styles.richBar, styles.richBarDark]}
                flatContainerStyle={styles.flatStyle}
                editor={this.richbsPlan}
                disabled={this.state.disabled}
                actions={[
                  actions.undo,
                  actions.redo,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertOrderedList,
                  actions.alignLeft,
                  actions.alignCenter,
                ]}
              />
            </ScrollView>
          </BottomSheet>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'left',
                // padding: 5,
              }}>
              Activity
            </Text>

            <RichEditor
              ref={this.richTextActivity}
              initialHeight={300}
              // initialContentHTML={this.state.activity}
              placeholder={'please input content'}
              // useContainer={false}
              containerStyle={{minHeight: 100}}
              // onHeightChange={handleHeightChange}
              onHeightChange={this.handleHeightChange}
              // onChange={text => this.setState({activity: text})}
              onFocus={() => {
                this.setState({isVisibleActivity: true});
                this.richTextActivity.setHTMLCode('');
                this.setState({editorHeight: this.state.windowHeight});
                console.log(this.state.editorHeight);
              }}
              //onFocus={this.handleFocusActivity}
              onBlur={this.handleBlur}
            />
            <RichToolbar
              style={[styles.richBar, styles.richBarDark]}
              flatContainerStyle={styles.flatStyle}
              editor={this.richTextActivity}
              disabled={this.state.disabled}
              actions={[
                actions.undo,
                actions.redo,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertOrderedList,
                actions.alignLeft,
                actions.alignCenter,
              ]}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'left',
                // padding: 5,
              }}>
              Result
            </Text>

            <RichEditor
              ref={this.richTextResult}
              initialHeight={300}
              // initialContentHTML={this.state.activity}
              placeholder={'please input content'}
              // useContainer={false}
              containerStyle={{minHeight: 100}}
              // onHeightChange={handleHeightChange}
              onHeightChange={this.handleHeightChange}
              // onChange={text => this.setState({activity: text})}
              onFocus={() => {
                this.setState({isVisibleResult: true});
                this.richTextResult.setHTMLCode('');
                this.setState({editorHeight: this.state.windowHeight});
                console.log(this.state.editorHeight);
              }}
              //onFocus={this.handleFocusActivity}
              onBlur={this.handleBlur}
            />
            <RichToolbar
              style={[styles.richBar, styles.richBarDark]}
              flatContainerStyle={styles.flatStyle}
              editor={this.richTextResult}
              disabled={this.state.disabled}
              actions={[
                actions.undo,
                actions.redo,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertOrderedList,
                actions.alignLeft,
                actions.alignCenter,
              ]}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'left',
                // padding: 5,
              }}>
              Plan
            </Text>
            <RichEditor
              ref={this.richTextPlan}
              initialHeight={300}
              // initialContentHTML={this.state.activity}
              placeholder={'please input content'}
              // useContainer={false}
              containerStyle={{minHeight: 100}}
              // onHeightChange={handleHeightChange}
              onHeightChange={this.handleHeightChange}
              // onChange={text => this.setState({activity: text})}
              onFocus={() => {
                this.setState({isVisiblePlan: true});
                this.richTextPlan.setHTMLCode('');
                this.setState({editorHeight: this.state.windowHeight});
                console.log(this.state.editorHeight);
              }}
              //onFocus={this.handleFocusActivity}
              onBlur={this.handleBlur}
            />
            <RichToolbar
              style={[styles.richBar, styles.richBarDark]}
              flatContainerStyle={styles.flatStyle}
              editor={this.richTextPlan}
              disabled={this.state.disabled}
              actions={[
                actions.undo,
                actions.redo,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertOrderedList,
                actions.alignLeft,
                actions.alignCenter,
              ]}
            />
          </View>

          {/* <View>
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
                value={this.state.activity}
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
          </View> */}

          <View>
            {/*Showing the data of selected Single file*/}

            {/* <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: '#ecf0f1',
                paddingVertical: 15,
                marginHorizontal: 5,
                borderRadius: 9,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.5}
              onPress={this.selectFile}>
              <Icon name="paperclip" size={20} color="#000001" />
              <Text
                style={{color: '#000001', fontSize: 18, fontWeight: 'light'}}>
                SELECT FILE ATTACHMENT
              </Text>
            </TouchableOpacity> */}
            {this.state.singleFile != null ? (
              <View
                style={{
                  marginHorizontal: 5,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                {this.state.singleFile[0].type == 'image/jpeg' ? (
                  <View style={{marginTop: 5}}>
                    <Icon name="file-image" size={40} color="#000001" />
                  </View>
                ) : (
                  <View style={{marginTop: 5}}>
                    <Icon name="file-pdf" size={40} color="#000001" />
                  </View>
                )}

                <Text style={{marginLeft: 10, color: 'black'}}>
                  File Name:{' '}
                  {this.state.singleFile[0].name
                    ? this.state.singleFile[0].name
                    : ''}
                  {'\n'}
                  Type:{' '}
                  {this.state.singleFile[0].type
                    ? this.state.singleFile[0].type
                    : ''}
                  {'\n'}
                  File Size:{' '}
                  {this.state.singleFile[0].size
                    ? this.state.singleFile[0].size
                    : ''}
                  {'\n'}
                  URI:{' '}
                  {this.state.singleFile[0].uri
                    ? decodeURIComponent(this.state.singleFile[0].uri)
                    : ''}
                  {'\n'}
                </Text>
              </View>
            ) : null}
          </View>

          {/* <TouchableOpacity
            style={{
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: '#ecf0f1',
              paddingVertical: 15,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              elevation: 2,
            }}
            onPress={this.submitData}>
            <Text style={{color: '#000001', fontSize: 18, fontWeight: 'light'}}>
              SUBMIT
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
        <SpeedDial
          style={{marginBottom: 75}}
          isOpen={this.state.open}
          icon={{name: 'add', color: '#fff'}}
          openIcon={{name: 'close', color: '#fff'}}
          onOpen={() => this.setState({open: true})}
          onClose={() => this.setState({open: false})}>
          <SpeedDial.Action
            icon={{name: 'send', color: '#fff'}}
            title="Kirim"
            onPress={this.submitData}
          />
          <SpeedDial.Action
            icon={{name: 'save', color: '#fff'}}
            title="Simpan Draft"
            onPress={this.dardraft}
          />
          <SpeedDial.Action
            icon={{name: 'folder', color: '#fff'}}
            title="Lampiran"
            onPress={this.selectFile}
          />
          <SpeedDial.Action
            icon={{name: 'remove', color: '#fff'}}
            title="Tidak Masuk"
            onPress={() => console.log('Add Something')}
          />
        </SpeedDial>

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

                parameter: 'FilterName',
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
              this.props.navigation.navigate('Cuti', {
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
