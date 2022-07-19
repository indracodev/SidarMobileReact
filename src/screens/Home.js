import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubsribe = this.props.navigation.addListener('focus', () => {
      console.log('hello world');
      //ambild data di server bisa dilakukan disini
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
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
      </View>
    );
  }
}

export default Home;
