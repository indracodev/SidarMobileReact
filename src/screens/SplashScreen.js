import React, {Component} from 'react';
import {Text, View} from 'react-native';
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
      this.props.navigation.dispatch(StackActions.replace('LoginLanding'));
    }, 2500);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#212121',
        }}>
        <Text style={{fontSize: 68, color: '#FFFFFF'}}>SIDAR</Text>
      </View>
    );
  }
}

export default SplashScreen;
