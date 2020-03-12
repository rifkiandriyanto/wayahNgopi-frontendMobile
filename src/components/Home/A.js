import React, {Component} from 'react';
import {
  View,
  TextInput,
  Image,
  Button,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import {SearchBar} from 'react-native-elements';

class HomeScreen extends Component {
  componentDidMount() {
    if (!AsyncStorage.getItem('isAuth')) {
      this.props.navigation.navigate('LoginScreen');
    }
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={{backgroundColor: 'lightblue', flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#c3faec'}}>
          <View>
            <View
              style={{
                backgroundColor: '#7fa39a',
                marginHorizontal: 17,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 15,
              }}>
              <Text style={{padding: 8, color: 'black'}}>Category</Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                backgroundColor: '#d2d9d5',
                marginHorizontal: 17,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <View
                style={{
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Food')}>
                  <Text>Food</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Drink')}>
                  <Text>Drink</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{height: 54, backgroundColor: 'yellow', flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={{
                backgroundColor: 'white',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 10, color: '#545454', marginTop: 4}}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
   
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Product')}
            style={{
              backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 10, color: '#545454', marginTop: 4}}>
              Products
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Category')}
            style={{
              backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 10, color: '#545454', marginTop: 4}}>
              Category
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
