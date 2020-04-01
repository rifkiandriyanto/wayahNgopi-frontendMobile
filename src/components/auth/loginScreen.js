import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Header, Content, Tab, Tabs, TabHeading} from 'native-base';
import Login from './login';
import Profile from './profile';
import Register from './register';
import {connect} from 'react-redux';

import { withNavigation } from 'react-navigation';
class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    if (!this.props.auth.isAuthenticated){
      return (
        <Login />
      )
    }
    else {
      return (
        <Profile />
      )
    }
  }
}
const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#a5a6a8',
  },
  text: {
    color: 'white'
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default withNavigation(connect(mapStateToProps)(LoginScreen)) ;
