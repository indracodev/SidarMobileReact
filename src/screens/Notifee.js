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
  Alert,
  Image,
  Button,
} from 'react-native';
import notifee from '@notifee/react-native';

class Fnotifee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      datalogin: [],
      iduser: '',
      curTime: '',
      tanggaldar: '',
    };
  }
  async onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    console.log('masuk');

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    console.log('masuk 2');
    // Display a notification
    try {
      console.log('masuk 3');
      await notifee.displayNotification({
        title: 'Sidar',
        body: 'Anda Belum Mengisi sidar pada periode' + this.state.tanggaldar,
        android: {
          channelId,
          //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    this.setState({tanggaldar: '23-08-2022'});
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      });
      var hours = new Date().getHours();
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();
      if (hours == 10 && min == 20 && sec == 0) {
        console.log('run function x');
        this.onDisplayNotification();
      }
    }, 1000);
  }
  render() {
    return (
      <View>
        <Text style={{color: 'red'}}>time</Text>
        <Text style={{color: 'red'}}>Date: {this.state.curTime}</Text>
        <Button
          title="Display Notification"
          onPress={() => this.onDisplayNotification()}
        />
      </View>
    );
  }
}

export default Fnotifee;
