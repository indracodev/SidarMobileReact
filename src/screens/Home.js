import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   componentDidMount() {
  //     this.unsubsribe = this.props.navigation.addListener('focus', () => {
  //       console.log('hello world');
  //       //ambild data di server bisa dilakukan disini
  //     });
  //   }

  //   componentWillUnmount() {
  //     this.unsubscribe();
  //   }

  render() {
    return (
      <View style={{backgroundColor: '#f98441', flex: 1}}>
        <View style={{flex: 1, margin: 20}}>
          <Text
            style={{
              color: '#ffffff',
              fontsize: 25,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            INDRACO - SIDAR
          </Text>
          <Text style={{color: '#ffffff', fontSize: 12}}>Welcome To Home</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Detail', {
              // membuat data untuk di kirim ke page detail
              namaUser: 'Indraco',
              product: [
                {brand: 'ucafe', rasa: 'mocachinno'},
                {brand: 'rasa sayang', rasa: 'kopi'},
              ],
              ucafe: {},
            })
          }>
          <Text>Pergi Ke Detail</Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            paddingVertical: 10,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="chart-bar" size={20} color="#f98441" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="home" size={25} color="#f98441" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="book" size={20} color="#f98441" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//mobile multimedia solution : matakuliah ini mempelajari tentang dasar dasar aplikasi mobile dengan javascript menggunakan react native. pada matakuliah ini dikenalkan basic component, navigation dan passing data
//mobile application for businness : matakuliah ini mempelajari lanjutan aplikasi mobile. pada matakuliah ini akan mempelajari pembuatan backend REST API, kombinasi backend REST API dan FRONT END Mobile
//advance topic in mobile programming : mata kuliah ini mempelajari bagaimana mengembangkan aplikasi mobile terintegrasi berbasis microservice dengan studi kasus pembuatan aplikasi tertentu

export default Home;
