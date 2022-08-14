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
import {Text, View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // console.log('component did mount gaes');
    setTimeout(() => {
      //   this.props.navigation.navigate('Home');
      // this.props.navigation.dispatch(StackActions.replace('SignIn'));
      // this.props.navigation.dispatch(StackActions.replace('Login'));
      this.props.navigation.dispatch(StackActions.replace('HomeScreen'));
    }, 2500);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#373737',
        }}>
        <Image
          style={{
            width: 300,
            height: 52,
            // borderRadius: 25,
            // resizeMode: 'contain',
          }}
          source={require('../images/logo-light.png')}
        />
        {/* <Text style={{fontSize: 68, color: '#ffffff', fontWeight: 'bold'}}>
          SIDAR
        </Text> */}
      </View>
    );
  }
}

export default SplashScreen;
