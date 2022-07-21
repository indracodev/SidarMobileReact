import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import axios from 'axios';
const baseUrl = 'http://apilumen.psikologiuwp.com';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubsribe = this.props.navigation.addListener('focus', () => {
      console.log('hello world');
      let username = 'suryo';
      let password = '123456';
      //ambild data di server bisa dilakukan disini
      axios({
        method: 'get',
        url: `${baseUrl}/api/userlogin/?username=${username}&pwd=${password}`,
      })
        .then(response => {
          console.log(response.data.data);
          console.log(response.data.data[0]);
          console.log(response.data.message);
          if (response.data.message == 'success') {
            console.log(response.data.data[0].username);
            // localStorage.username = username;
            // localStorage.id = res.data.id;
            // localStorage.no_pendaftaran = res.data.no_pendaftaran;

            // this.$router.push({
            //   name: 'dashboard',
            // });
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

  // axios({
  //   method: 'get',
  //   url: `${baseUrl}/api/users/1`,
  // }).then(response => {
  //   console.log(response.data);
  // });

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
          <Text style={{color: '#ffffff', fontSize: 12}}>DAR</Text>
        </View>

        <View
          style={{
            marginTop: 5,
            padding: 10,
            backgroundColor: '#2b2b2b',
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 10,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              width: '50%',
              borderRadius: 5,
              padding: 1,
            }}
            onPress={() => this.props.navigation.navigate('Maps')}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Masuk
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: '50%',
              borderRadius: 5,
              padding: 1,
            }}
            onPress={() => this.props.navigation.navigate('Maps')}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Keluar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={{marginTop: 10, marginBottom: 5}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'left',
                padding: 5,
              }}>
              Laporan Hari Ini
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <PieChart
              data={[
                {
                  name: 'Ontime',
                  population: 28,
                  color: 'green',
                  legendFontColor: 'white',
                  legendFontSize: 11,
                },
                {
                  name: 'Late',
                  population: 1,
                  color: 'yellow',
                  legendFontColor: 'white',
                  legendFontSize: 11,
                },
                {
                  name: 'Over',
                  population: 0,
                  color: 'red',
                  legendFontColor: 'white',
                  legendFontSize: 11,
                },
                {
                  name: 'No Data',
                  population: 1,
                  color: 'black',
                  legendFontColor: 'white',
                  legendFontSize: 11,
                },
                {
                  name: 'Absence',
                  population: 0,
                  color: 'blue',
                  legendFontColor: 'white',
                  legendFontSize: 11,
                },
              ]}
              width={Dimensions.get('window').width - 10} // from react-native
              height={220}
              chartConfig={{
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                  borderRadius: 16,
                },
              }}
              backgroundColor="#2b2b2b"
              accessor="population"
              paddingLeft="15"
              absolute
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{marginTop: 10, marginBottom: 5}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'left',
                padding: 5,
              }}>
              Laporan Aktivitas Harian
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <BarChart
              data={{
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 10} // from react-native
              height={220}
              yAxisLabel={''}
              chartConfig={{
                backgroundColor: '#2b2b2b',
                backgroundGradientFrom: '#2b2b2b',
                backgroundGradientTo: '#2b2b2b',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                barPercentage: 1,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{marginTop: 10, marginBottom: 5}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'left',
                padding: 5,
              }}>
              Performa Bulanan
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <LineChart
              data={{
                labels: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'Mei',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Okt',
                  'Nov',
                  'Des',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                    strokeWidth: '2',
                    color: (opacity = 1) => `green`,
                  },
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                    strokeWidth: '2',
                    color: (opacity = 1) => `yellow`,
                  },
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                    strokeWidth: '2',
                    color: (opacity = 1) => `red`,
                  },
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                    strokeWidth: '2',
                    color: (opacity = 1) => `black`,
                  },
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                    strokeWidth: '2',
                    color: (opacity = 1) => `blue`,
                  },
                ],
                legend: ['Ontime', 'Late', 'over', 'NoData', 'Absence'],
              }}
              width={Dimensions.get('window').width - 10} // from react-native
              height={220}
              yAxisLabel={''}
              chartConfig={{
                backgroundColor: '#2b2b2b',
                backgroundGradientFrom: '#2b2b2b',
                backgroundGradientTo: '#2b2b2b',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
        {/* 
        <TouchableOpacity
          style={{
            marginBottom: 40,
            backgroundColor: '#f98441',
            paddingVertical: 15,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9,
            elevation: 2,
          }}
          onPress={() => this.props.navigation.navigate('LaporanDar')}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            Simpan
          </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
});

export default Home;
