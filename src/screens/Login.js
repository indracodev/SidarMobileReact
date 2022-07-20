import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
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
import {StackActions} from '@react-navigation/native';
import axios from 'axios';

const baseUrl = 'http://apilumen.psikologiuwp.com';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      password: '123',
    };
  }

  componentDidMount() {
    this.unsubsribe = this.props.navigation.addListener('focus', () => {
      console.log(this.state.username);
      console.log(this.state.password);
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

  submitData = () => {
    console.log('tombollogin mengirimkan data');
    console.log(this.state.username);
    console.log(this.state.password);

    let username = this.state.username;
    let password = this.state.password;
    // alert('hiiiii');
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
          this.props.navigation.dispatch(StackActions.replace('Home'));
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
  };

  render() {
    return (
      <View>
        <TextInput
          onChangeText={text => this.setState({username: text})}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 20,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
          }}
          placeholder="Masukkan Username Anda"
        />
        <TextInput
          onChangeText={text => this.setState({password: text})}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 10,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
          }}
          placeholder="Masukkan Password Anda"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{marginTop: 20, marginRight: 20}}
          onPress={() => this.props.navigation.navigate('LupaPassword')}>
          <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
            Lupa Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 40,
            backgroundColor: '#f98441',
            paddingVertical: 15,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9,
            elevation: 2,
          }}
          // onPress={() => this.props.navigation.navigate('Home')}>
          onPress={this.submitData}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
