// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/

// import React in our code
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ScrollView,
  Platform,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
import DocumentPicker from 'react-native-document-picker';

const AbsenceMasuk = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  // const getOneTimeLocation = () => {
  //   setLocationStatus('Refresh Location');
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     position => {
  //       setLocationStatus('You are Here');

  //       //getting the Longitude from the location json
  //       const currentLongitude = position.coords.longitude;

  //       //getting the Latitude from the location json
  //       const currentLatitude = position.coords.latitude;

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Longitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     error => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000,
  //     },
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     position => {
  //       //Will give you the location on location change
  //       setLocationStatus('You are Here');
  //       console.log(position);
  //       //getting the Longitude from the location json
  //       const currentLongitude = JSON.stringify(position.coords.longitude);
  //       //getting the Latitude from the location json
  //       const currentLatitude = JSON.stringify(position.coords.latitude);
  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);
  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     error => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000,
  //     },
  //   );
  // };

  const selectOneFile = async () => {
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
      //Printing the log realted to the file
      // console.log('res : ' + JSON.stringify(res, null, 2));
      // console.log('URI : ' + res[0].uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
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

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const [singleFile, setSingleFile] = useState('');
  const [multipleFile, setMultipleFile] = useState([]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          /> */}
        <Text>ABSENCE MASUK</Text>
        <Text style={styles.boldText}>{locationStatus}</Text>

        <SafeAreaView style={{flex: 1}}>
          <Text style={styles.titleText}>
            Example of File Picker in React Native
          </Text>
          <View style={styles.container}>
            {/*To show single file attribute*/}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={selectOneFile}>
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
            <Text style={styles.textStyle}>
              File Name: {singleFile.name ? singleFile.name : ''}
              {'\n'}
              Type: {singleFile.type ? singleFile.type : ''}
              {'\n'}
              File Size: {singleFile.size ? singleFile.size : ''}
              {'\n'}
              URI: {singleFile.uri ? singleFile.uri : ''}
              {'\n'}
            </Text>
            <View
              style={{
                backgroundColor: 'grey',
                height: 2,
                margin: 10,
              }}
            />
            {/*To multiple single file attribute*/}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={selectMultipleFile}>
              {/*Multiple files selection button*/}
              <Text style={{marginRight: 10, fontSize: 19}}>
                Click here to pick multiple files
              </Text>
              <Image
                source={{
                  uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                }}
                style={styles.imageIconStyle}
              />
            </TouchableOpacity>
            <ScrollView>
              {/*Showing the data of selected Multiple files*/}
              {multipleFile.map((item, key) => (
                <View key={key}>
                  <Text style={styles.textStyle}>
                    File Name: {item.name ? item.name : ''}
                    {'\n'}
                    Type: {item.type ? item.type : ''}
                    {'\n'}
                    File Size: {item.size ? item.size : ''}
                    {'\n'}
                    URI: {item.uri ? item.uri : ''}
                    {'\n'}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373737',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 30,
    color: 'red',
    marginVertical: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});

export default AbsenceMasuk;
