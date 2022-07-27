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
import {Text, View, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';

// const baseUrl = 'http://sidar-staging.suryoatmojo.my.id';
const baseUrl = 'http://localhost/sidar-new';

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

// var divisi = [];

var cobavar = 'suryo';

class LaporanDar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dar: [],
      color: '',
    };
  }

  componentDidMount() {
    console.log('token');

    this.unsubsribe = this.props.navigation.addListener('focus', () => {
      // console.log(this.state.username);
      // console.log(this.state.password);
      // let username = 'suryo';
      // let password = '123456';
      console.log('ini did mount laporan dar');

      //ambild data di server bisa dilakukan disini
      axios({
        method: 'get',
        url: `${baseUrl}/api/sidar_dar/all`,
        headers: {
          'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
          'X-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiNCJ9LCJpYXQiOjE2NTg4OTMxMTYsImV4cCI6MTY1ODk3OTUxNn0.EZ37dkHamVdmQEotM3v_gAQDsra1jTsDlHqXbssojoY',
        },
      })
        .then(response => {
          console.log('api get');
          // console.log(response.status);
          // console.log(response.data.data.sidar_dar);
          this.setState({dar: response.data.data.sidar_dar});
          // console.log('ini isi divisi');
          // console.log(this.state.dar);

          // console.log(response.data.data[0]);
          // console.log(response.data.message);
          if (response.data.message == 'success') {
            console.log(response.data.data[0].username);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  }

  componentWillUnmount() {
    this.unsubsribe();
  }

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
          data={this.state.dar}
          renderItem={({item, index}) => (
            //styling view
            <TouchableOpacity
              style={{
                // backgroundColor: '#60a5f0',
                backgroundColor: '#2b2b2b',
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
                  backgroundColor: this.state.color,
                  borderRadius: 50,
                  paddingHorizontal: 5,
                  width: 160,
                  paddingVertical: 5,
                  marginBottom: 20,
                  fontWeight: 'bold',
                  fontSize: 10,
                  color: '#ffffff',
                }}>
                {item.namakaryawan}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      // marginLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#ffffff',
                    }}>
                    {item.tanggal} / {item.jam}
                  </Text>
                  <Text style={{color: '#aad5fc'}}>STATUS</Text>
                  <Text
                    style={{
                      backgroundColor: item.colorstatus,
                      borderRadius: 50,
                      paddingHorizontal: 5,
                      width: 75,
                      paddingVertical: 5,
                      marginTop: 5,
                      marginBottom: 5,
                      fontWeight: 'bold',
                      fontSize: 10,
                      color: 'grey',
                    }}>
                    {item.status}
                  </Text>
                </View>
                <View>
                  <Icon name="check" size={50} color="rgba(255,255,255,0.5)" />
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
