import React, {Component} from 'react';
import {login} from '../redux/actions/auth';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {API_KEY} from 'react-native-dotenv';
import {Icon} from 'native-base';
import {connect} from 'react-redux';

import {withNavigation} from 'react-navigation';

class Login extends Component {
  static navigationOptions = {
    tittle: null,
  };
  constructor() {
    super();
    this.state = {
      showPass: true,
      press: false,
    };
  }

  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('HomeScreen');
    }
  }

  onSubmit = async e => {
    console.log('ini submit', this.state);
    await this.props.dispatch(login(this.state));
    this.props.navigation.navigate('HomeScreen');
  };

  showPass = () => {
    if (this.state.press === false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

  onChangeEmail = event => {
    console.log(event);
    this.setState({
      email: event,
    });
  };

  onChangePass = event => {
    console.log(event);
    this.setState({
      password: event,
    });
  };

  render() {
    return (
      <>
        <View style={styles.logoContainer}>
          {/* <Image source={logo} style={styles.logo} /> */}
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={27} color={'grey'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'username'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlinedColorAndroid="transparent"
            onChangeText={this.onChangeEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={27} color={'grey'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'password'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlinedColorAndroid="transparent"
            onChangeText={this.onChangePass}
          />

          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}>
            <Icon
              name={this.state.press === false ? 'eye' : 'eye-slash'}
              size={27}
              color={'grey'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={this.onSubmit}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <View>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 290,
    height: 290,
    marginTop: -90,
  },
  logoContainer: {
    alignItems: 'center',
  },
  input: {
    height: 45,
    borderRadius: 25,
    fontSize: 18,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255,255,255, 0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 9,
    left: 39,
  },
  inputContainer: {
    marginBottom: 15,
  },
  btnEye: {
    position: 'absolute',
    top: 7,
    right: 39,
  },
  btnLogin: {
    height: 45,
    borderRadius: 25,
    fontSize: 18,
    backgroundColor: '#f1a98c',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
