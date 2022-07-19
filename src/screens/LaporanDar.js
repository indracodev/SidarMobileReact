import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

var product = [
  {brand: 'ucafe', rasa: 'mocachinno'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
  {brand: 'rasa sayang', rasa: 'kopi'},
];

var cobavar = 'suryo';

class LaporanDar extends Component {
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
      <View style={{backgroundColor: '#e8e8e8', flex: 1}}>
        {/* <View style={{flex: 1}}> */}
        <View
          style={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: '#f98441',
            padding: 20,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontsize: 25,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            INDRACO - SIDAR
          </Text>
          <Text style={{color: '#ffffff', fontSize: 12}}>
            Welcome To Laporan DAR {cobavar}
          </Text>
        </View>
        {/* </View> */}

        {/* <Text>Pergi Ke Detail</Text> */}
        <FlatList
          style={{marginTop: 10}}
          data={product}
          renderItem={({item, index}) => (
            //styling view
            <View
              style={{
                backgroundColor: '#212121',
                marginTop: 10,
                marginHorizontal: 20,
                padding: 20,
                borderRadius: 6,
              }}>
              <Text style={{color: '#FFFFFF'}}>{item.brand}</Text>
            </View>
          )}
        />
        {/* 
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
        </TouchableOpacity> */}

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
            <Text
              style={{
                color: '#f98441',
                fontsize: 9,
              }}>
              Laporan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="home" size={25} color="#f98441" />
            <Text
              style={{
                color: '#f98441',
                fontsize: 9,
              }}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Dar')}>
            <Icon name="book" size={20} color="#f98441" />
            <Text
              style={{
                color: '#f98441',
                fontsize: 9,
              }}>
              DAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LaporanDar;
