import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/auth';
import {withNavigation} from 'react-navigation';
import { getUser } from '../redux/actions/user'

class Profile extends Component {
  onLogout() {
    this.props.dispatch(logout());
    this.props.navigation.navigate('Home');
  }

 componentDidMount (){
    const id = this.props.auth.profile.id
    this.props.dispatch(getUser(id))
  }

  render() {
    const { user } = this.props
    console.log(user)
    const profile = this.props.auth.profile;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{uri: profile.image}}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.info}>Username: {profile.username}</Text>
              <Text style={styles.description}>email: {profile.email}</Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={()=>this.props.navigation.navigate('profileUser')}>
                <Text>Edit Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.onLogout()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#a5a6a8',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#a5a6a8',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#f1a98c',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#f1a98c',
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user.user
  };
};
export default withNavigation(connect(mapStateToProps)(Profile));
