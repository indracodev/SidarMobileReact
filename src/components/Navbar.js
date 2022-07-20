import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Navbar = () => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        paddingVertical: 10,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      }}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => this.props.navigation.navigate('LaporanDar')}>
        <Icon name="chart-bar" size={20} color="#f98441" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => this.props.navigation.navigate('Home')}>
        <Icon name="home" size={25} color="#f98441" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => this.props.navigation.navigate('Dar')}>
        <Icon name="book" size={20} color="#f98441" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
