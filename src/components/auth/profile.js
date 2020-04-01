import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/auth';
import {withNavigation} from 'react-navigation';
import {getUser} from '../redux/actions/user';
import avatar from '../Assets/avatar.png';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  Title,
  Left,
  Right,
  Body,
} from 'native-base';

class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: null,
      headerStyle: {backgroundColor: '#324191'},
      headerLeft: null,
    };
  };

  onLogout() {
    this.props.dispatch(logout());
    this.props.navigation.navigate('Home');
  }

  componentDidMount() {
    const id = this.props.auth.profile.id;
    this.props.dispatch(getUser(id));
  }

  render() {
    const {user} = this.props;
    console.log(user);
    const profile = this.props.auth.profile;
    return (
      <>
        <Container>
          <Content>
            <Image style={styles.avatar} source={avatar} />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.info}>Username: {profile.username}</Text>
                <Text style={styles.description}>email: {profile.email}</Text>
                {/* <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('profileUser')}>
                <Text>Edit Image</Text>
              </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.onLogout()}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>

          <Footer>
            <FooterTab>
              <Button
                vertical
                onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <Icon name="apps" />
                <Text>Apps</Text>
              </Button>
              <Button
                vertical
                onPress={() => this.props.navigation.navigate('Product')}>
                <Icon name="folder" />
                <Text>Product</Text>
              </Button>
              <Button
                badge
                vertical
                onPress={() => this.props.navigation.navigate('Cart')}>
                <Badge>
                  <Text>{this.props.totalPurchase}</Text>
                </Badge>
                <Icon name="cart" />
                <Text>Cart</Text>
              </Button>
              <Button
                vertical
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Icon name="person" />
                <Text>User</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
  bodyContent: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    padding: 20,
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
    marginTop: 150,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
    backgroundColor: '#f1a98c',
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user.user,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};
export default withNavigation(connect(mapStateToProps)(Profile));
