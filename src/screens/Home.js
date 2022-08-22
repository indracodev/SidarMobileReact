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
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
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
import MenuDrawer from 'react-native-side-drawer';
const baseUrl = 'http://new.sidar.id';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = 'http://localhost/sidar-new';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusdarthisday: [0, 0, 0, 0, 1],
      d: 1,
      labelku: 'ontime',
      datalogin: [],
      token: '',
    };
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  drawerContent = () => {
    return (
      <View style={styles.sidebar}>
        <Text style={[styles.sidebartext, {marginTop: 20, marginBottom: 20}]}>
          PENGATURAN
        </Text>
        <TouchableOpacity
          style={[styles.sidebarbutton, {marginBottom: 5}]}
          onPress={this.toggleOpen}>
          <Text style={styles.sidebartext}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sidebarbutton, {marginBottom: 5}]}
          onPress={() => {
            this.setState({open: !this.state.open});
            this.props.navigation.navigate('LaporanDar');
          }}>
          <Text style={styles.sidebartext}>Ganti Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sidebarbutton, {marginBottom: 5}]}
          onPress={() => {
            this.setState({open: !this.state.open});
            this.props.navigation.navigate('Tentang');
          }}>
          <Text style={styles.sidebartext}>Tentang</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sidebarbutton, {marginBottom: 5}]}
          onPress={() => {
            this.setState({open: !this.state.open});
            this.props.navigation.navigate('Bantuan');
          }}>
          <Text style={styles.sidebartext}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sidebarbutton}
          onPress={() => {
            this.setState({open: !this.state.open});
            this.props.navigation.navigate('KritikSaran');
          }}>
          <Text style={styles.sidebartext}>Kritik & Saran</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    // this.unsubsribe = this.props.navigation.addListener('focus', () => {
    console.log('hello world');
    console.log('ini isi token dari params');
    // console.log(this.props.route.params.token);
    var tokens = '';
    AsyncStorage.getItem('@storage_Key').then(value => {
      console.log('coba get value token');
      console.log(value);
      this.setState({token: value});
      tokens = value;

      console.log(
        '================================== axios di dalam sync=====================================================================',
      );

      axios({
        method: 'get',
        url: `${baseUrl}/api/user/profile`,
        headers: {
          'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
          // 'X-Token':
          //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE2NTk0MjA3MDIsImV4cCI6MTY1OTUwNzEwMn0.rMxjxCy1sBDujijf2aEl1DMEKQJXicMW0itDO_mwnLY',
          'X-Token': value,
        },
      })
        .then(responseprofile => {
          console.log('ini profile user');
          console.log(responseprofile.data);
          console.log('ini axios di dlam sync');
          console.log(responseprofile.data.data.user.id_karyawan);
          console.log(this.state.token);

          this.setState({
            datalogin: responseprofile.data.data.user,
          });
          let iduser = responseprofile.data.data.user.id_karyawan;
          //ambild data di server bisa dilakukan disini
          axios({
            method: 'get',
            url: `${baseUrl}/api/sidar_masterkaryawan/detail/?id=${iduser}`,
            headers: {
              'X-Api-Key': '0ED40DE05125623C8753B6D3196C18DE',
              'X-Token': value,
            },
          })
            .then(response => {
              console.log(
                '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
              );

              console.log(response.data.data.sidar_masterkaryawan);
              console.log(response.data.message);

              console.log('check');
              this.setState({
                statusdarthisday:
                  response.data.data.sidar_masterkaryawan[0].statusdarthisday,
              });
              console.log(this.state.statusdarthisday[4]);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  }

  componentWillUnmount() {
    // this.unsubsribe();
  }

  logout = async () => {
    console.log('logout');
    try {
      AsyncStorage.removeItem('@storage_Key');
      try {
        this.props.navigation.navigate('Login');
      } catch (error) {
        console.error(error);
      }
    } catch (e) {}
  };

  showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Logout', [
      {
        text: 'Yes',
        onPress: () => {
          this.logout();
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuDrawer
          open={this.state.open}
          position={'right'}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}>
          <View style={{backgroundColor: '#fffff', flex: 1}}>
            {/* <View
              style={{
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: '#393939',
                padding: 20,
              }}>
              <TouchableOpacity onPress={this.toggleOpen}>
                <Icon name="cog" size={30} color="#ffffff" />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                INDRACO - SIDAR
              </Text>
            </View> */}

            <View
              style={{
                marginTop: 5,
                padding: 10,
                backgroundColor: '#f9ffff',
                paddingVertical: 10,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Text
                style={{
                  color: '#393939',
                  fontSize: 12,
                }}>
                Hi, {this.state.datalogin.username}
                {'\n'}Anda terakhir login pada,{' '}
                {this.state.datalogin.last_login}
                {'\n'}
                {/* token, {this.state.token} */}
              </Text>
            </View>

            <View
              style={{
                marginTop: 5,
                padding: 10,
                backgroundColor: '#f9ffff',
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
                  backgroundColor: '#84b291',
                  width: '50%',
                  borderRadius: 5,
                  padding: 1,
                }}
                // onPress={() => this.props.navigation.navigate('Maps')}>
                onPress={() => this.props.navigation.navigate('AbsenceMasuk')}>
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
                  backgroundColor: '#b28484',
                  width: '50%',
                  borderRadius: 5,
                  padding: 1,
                }}
                // onPress={() => this.props.navigation.navigate('Maps')}>
                onPress={() => this.props.navigation.navigate('AbsenceKeluar')}>
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
                      name: this.state.labelku,
                      population: this.state.statusdarthisday[0],
                      color: 'green',
                      legendFontColor: 'white',
                      legendFontSize: 11,
                    },
                    {
                      name: 'Late',
                      population: this.state.statusdarthisday[1],
                      color: 'yellow',
                      legendFontColor: 'white',
                      legendFontSize: 11,
                    },
                    {
                      name: 'Over',
                      population: this.state.statusdarthisday[2],
                      color: 'red',
                      legendFontColor: 'white',
                      legendFontSize: 11,
                    },
                    {
                      name: 'No Data',
                      population: this.state.statusdarthisday[4],
                      color: 'black',
                      legendFontColor: 'white',
                      legendFontSize: 11,
                    },
                    {
                      name: 'Absence',
                      population: this.state.statusdarthisday[3],
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
                {/* <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'grey',
                    textAlign: 'left',
                    padding: 5,
                  }}>
                  Laporan Aktivitas Harian 
                </Text> */}
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                {/* <BarChart
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
                /> */}
              </View>
              <View style={{marginTop: 10, marginBottom: 5}}>
                {/* <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'grey',
                    textAlign: 'left',
                    padding: 5,
                  }}>
                  Performa Bulanan
                </Text> */}
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                {/* <LineChart
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
                /> */}
              </View>
            </ScrollView>

            <View
              style={{
                backgroundColor: '#2b2b2b',
                flexDirection: 'row',
                paddingVertical: 10,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              }}>
              {/* DAR */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  this.props.navigation.navigate('Dar', {
                    data: this.state.datalogin,
                    token: this.state.token,
                  })
                }>
                <Icon name="book" size={20} color="#ffffff" />
                <Text
                  style={{
                    color: '#ffffff',
                    fontsize: 9,
                  }}>
                  DAR
                </Text>
              </TouchableOpacity>
              {/* Laporan */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  this.props.navigation.navigate('LaporanDar', {
                    data: this.state.datalogin,
                    token: this.state.token,
                  })
                }>
                <Icon name="chart-bar" size={20} color="#ffffff" />
                <Text
                  style={{
                    color: '#ffffff',
                    fontsize: 9,
                  }}>
                  Laporan
                </Text>
              </TouchableOpacity>
              {/* Home */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Icon name="home" size={25} color="#ffffff" />
                <Text
                  style={{
                    color: '#ffffff',
                    fontsize: 9,
                  }}>
                  Home
                </Text>
              </TouchableOpacity>

              {/* Cuti */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  this.props.navigation.navigate('Cuti', {
                    data: this.state.datalogin,
                    token: this.state.token,
                  })
                }>
                <Icon name="ban" size={20} color="#ffffff" />
                <Text
                  style={{
                    color: '#ffffff',
                    fontsize: 9,
                  }}>
                  Cuti
                </Text>
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.showConfirmDialog}>
                <Icon name="sign-out-alt" size={20} color="#ffffff" />
                <Text
                  style={{
                    color: '#ffffff',
                    fontsize: 9,
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </MenuDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 8,
    // paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#393939',
    padding: 10,
  },
  sidebarbutton: {
    backgroundColor: '#2b2b2b',
    // marginTop: 10,
    // marginHorizontal: 10,
    padding: 20,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderTopLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  sidebartext: {
    color: 'white',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
  },
});

export default Home;
