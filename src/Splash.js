import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
export default class Splash extends Component {
async componentDidMount() {
// You can load api data or any other thing here if you want
const data = await this.navigateToHome();
if (data !== null) {
this.props.navigation.navigate('Home');
}}
navigateToHome = async () => {
// Splash screen will remain visible for 2 seconds
const wait = time => new Promise((resolve) => setTimeout(resolve, time));
return wait(2000).then(() => this.props.navigation.navigate('Home'))
};
render() {
return (
<View style={styles.container}>
<Text style={{fontSize: 25}}>SPLASH SCREEN</Text>
</View>
);
}}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
});