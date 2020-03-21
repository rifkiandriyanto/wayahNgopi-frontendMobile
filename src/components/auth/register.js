import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Button } from 'native-base'


import {addUser} from '../redux/actions/user'


class Register extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    name: '',
    email: '',
    username:'',
    password:'',
    address:'',
  }

  onSubmit =() => {
    this.props.dispatch(addUser(this.state));
    this.props.navigation.navigate('HomeScreen')
    
}

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.regfrom}>
              <Text style={styles.header}>Registration </Text>
              <TextInput
                style={styles.textinput}
                placeholder="Name"
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({ name: text })}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Email"
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Username"
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({ username: text })}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                underlineColorAndroid={'transparent'}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Address"
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({ alamat: text })}
              />

              <TouchableOpacity style={styles.btnRegister} onPress={this.onSubmit}>
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 40,
    paddingRight: 40,
    marginVertical: 10,
  },
  regfrom: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#f1a98c',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#a5a6a8',
    borderBottomWidth: 3,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#a5a6a8',
    borderBottomColor: '#a5a6a8',
    borderBottomWidth: 1,
  },
  btnRegister: {
    width:  95,
    height: 45,
    borderRadius: 25,
    fontSize: 18,
    backgroundColor: '#f1a98c',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
