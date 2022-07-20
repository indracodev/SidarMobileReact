import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignInHeader from '../components/SignInHeader';
import TextArea from '../components/TextArea';
class Dar extends Component {
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
      <View style={{backColor: '#e8e8e8', flex: 1}}>
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
        {/* </View> */}

        <View style={{marginTop: 40, marginBottom: 10}}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#373248',
              textAlign: 'center',
            }}>
            Laporan Aktivitas Harian
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
            }}></Text>
        </View>

        {/* <TextArea placeholder="Description" /> */}

        <ScrollView style={{flexDirection: 'column'}}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Aktifitas Harian"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />

          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Result"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />

          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Plan"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </ScrollView>

        {/* <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Result"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View> */}

        {/* <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Plan"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View> */}

        {/* <TextInput
          multiline={true}
          numberOfLines={10}
          keyboardType="email-address"
          // onChangeText={text => setEmail(text)}
          style={{
            height: 200,
            textAlignVertical: 'top',
            backgroundColor: '#c5c5c5c5',
          }}
          placeholder="Aktivitas Harian"
        /> */}

        {/* <TextInput
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 10,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
          }}
          placeholder="Result"
        /> */}

        {/* <TextInput
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 10,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
          }}
          placeholder="Plan"
        /> */}

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
  textAreaContainer: {
    borderColor: '#c5c5c5',
    backgroundColor: '#000000',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Dar;
