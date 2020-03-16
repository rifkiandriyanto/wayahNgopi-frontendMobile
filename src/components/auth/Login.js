import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    if (AsyncStorage.getItem('token')) {
      console.log('haha');
      this.props.navigation.navigate('HomeScreen');
    } else {
      this.props.navigation.navigation('LoginScreen');
    }
  }

  onSubmit = e => {
    console.log('OK');
    e.preventDefault();

    axios
      .post('http://192.168.1.21:8006/user/login', this.state)
      .then(res => {
        console.log(res.data);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('user-id', res.data.id);
        AsyncStorage.setItem('status', res.data.status);
        AsyncStorage.setItem('isAuth', true);
        this.props.navigation.navigate('HomeScreen');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={{backgroundColor: '#e8f1ff', flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 100}}>
        <Image style={{width:135,height:135}} source={require('../Home/icon.png')} />
          <Text style={{color: '#a3aebf', fontSize: 20, fontWeight: 'bold'}}>
            Wayah Ngopi
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 50, marginBottom: 25}}>
          <TextInput
            style={{
              borderRadius: 15,
              paddingHorizontal: 100,
              borderWidth: 1,
              borderColor: '#C5BEBE',
              padding: 10,
            }}
            placeholder="Username"
            onChangeText={text => this.setState({email: text})}
          />
          <TextInput
            style={{
              borderRadius: 15,
              paddingHorizontal: 100,
              borderWidth: 1,
              borderColor: '#C5BEBE',
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Password"
            onChangeText={text => this.setState({password: text})}
          />
        </View>

        <View style={{marginHorizontal: 45}}>
          <TouchableOpacity style={{alignItems: 'center',
                justifyContent: 'center'}} onPress={this.onSubmit}>
            <Text
              style={{
                backgroundColor: '#a3aebf',
                borderRadius: 15
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
