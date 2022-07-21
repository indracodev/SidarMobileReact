import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

var product = [
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'Ucafe', rasa: 'mocachinno'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'Rasa Sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
  {backColor: '#2b2b2b', category: 'Kopi', brand: 'rasa sayang', rasa: 'kopi'},
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
      <View style={{backgroundColor: '#373737', flex: 1}}>
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
              fontSize: 25,
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
            <TouchableOpacity
              style={{
                // backgroundColor: '#60a5f0',
                backgroundColor: item.backColor,
                marginTop: 10,
                marginHorizontal: 10,
                padding: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}>
              {/* <View style={{flex: 1}}></View> */}
              <Text
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  borderRadius: 50,
                  paddingHorizontal: 5,
                  width: 160,
                  paddingVertical: 5,
                  marginBottom: 20,
                  fontWeight: 'bold',
                  fontSize: 10,
                  color: '#ffffff',
                }}>
                {item.category}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      // marginLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 22,
                      color: '#ffffff',
                    }}>
                    {item.brand}
                  </Text>
                  <Text style={{color: '#aad5fc'}}>{item.rasa}</Text>
                </View>
                <View>
                  <Icon name="laptop" size={50} color="rgba(255,255,255,0.5)" />
                </View>
              </View>
            </TouchableOpacity>
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
            backgroundColor: '#2b2b2b',
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
