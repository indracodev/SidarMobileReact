import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Detail</Text>
        <Text>{this.props.route.params.namaUser}</Text>
        {/* <Text>{this.props.route.params.product[0].brand}</Text>
        <Text>{this.props.route.params.product[1].brand}</Text> */}

        <FlatList
          data={this.props.route.params.product}
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text>Pergi Ke Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.pop}>
          <Text>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Detail;
