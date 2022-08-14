import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
export default class Dsetting extends Component {
static navigationOptions = {
title : "Setting"
}
render() {
return (
<View style={styles.container}>
<Text style={{fontSize : 25, marginBottom : 20}}>Setting SCREEN</Text><Button
title='About'
onPress = {() => this.props.navigation.navigate('About')}
/></View>
);
}}
const styles = StyleSheet.create({
container: {
flex : 1,
justifyContent: 'center',
alignItems: 'center',
},
});