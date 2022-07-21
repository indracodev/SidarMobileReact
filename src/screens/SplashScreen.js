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
      this.props.navigation.dispatch(StackActions.replace('SignIn'));
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
          style={{width: 237, height: 65, borderRadius: 25}}
          source={require('../images/indraco.png')}
        />
        {/* <Text style={{fontSize: 68, color: '#ffffff', fontWeight: 'bold'}}>
          SIDAR
        </Text> */}
      </View>
    );
  }
}

export default SplashScreen;
