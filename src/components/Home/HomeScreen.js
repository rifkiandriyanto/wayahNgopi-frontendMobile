import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postCart} from '../redux/actions/cart';
import {API_KEY} from 'react-native-dotenv';
import {
  TextInput,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from '../Spinner/Spinner';

import {getProducts} from '../redux/actions/product';

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: null,
      // headerTransparent: true,
      headerStyle: {backgroundColor: '#324191'},
      headerLeft: null,
      // headerRight: () => (
      //         <TouchableOpacity style={{marginRight:180}}
      //           onPress={() => navigation.navigate('AddProduct')}>
      //          <Ionicons name="ios-add-circle" size={40} color="#b6caff"></Ionicons>
      //         </TouchableOpacity>
      //       ),
    };
  };
  // static navigationOptions = {
  //   header: null,
  // };

  state = {
    activePage: 1,
    sort: 'id',
    by: 'ASC',
    searchName: '',
    activeCategory: '',
  };

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const data = {};
    await this.props.dispatch(getProducts(data));
  }

  onChangeSearch = event => {
    const data = {
      activePage: 1,
      activeCategory: '',
      searchName: event,
      sort: this.state.sort,
      by: this.state.by,
    };
    this.props.dispatch(getProducts(data));
  };

  addToCart = e => {
    var a;
    this.props.productsInCart.map(product => {
      if (parseInt(product.productId) === parseInt(e.id)) {
        a = 0;
        return alert('Product is alredy in cart');
      }
      return product;
    });
    if (a !== 0) {
      const data = {
        name: e.name,
        image: e.image,
        productId: e.id,
        price: e.price,
        stock: e.stock,
        quantity: 1,
      };
      this.props.dispatch(postCart(data));
    }
  };

  onRefreshing = () => {
    this.getProducts();
  };

  convertToRupiah(angka) {
    var rupiah = '';
    var angkarev = angka
      .toString()
      .split('')
      .reverse()
      .join('');
    for (var i = 0; i < angkarev.length; i++) {
      if (i % 3 == 0) {
        rupiah += angkarev.substr(i, 3) + '.';
      }
    }
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('') +
      ',-'
    );
  }

  renderRow = ({item}) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              height: 135,
              width: 155,
              borderRadius: 10,
            }}
          />
          <View style={{padding: 5, width: 80}}>
            <Text style={{color: '#777', paddingTop: 0}}>{item.name}</Text>
            <Text style={{color: '#777', paddingTop: 0}}>
              {this.convertToRupiah(item.price)}
            </Text>
            <Button iconLeft small onPress={() => this.addToCart(item)}>
              <Ionicons name="ios-cart" size={50} color="#b6caff"></Ionicons>
              <Text>Add To Cart</Text>
            </Button>
          </View>
        </View>
      </>
    );
  };

  render() {
    console.disableYellowBox = true;
    const {products} = this.props;

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#d2d9d5',
              borderRadius: 25,
              paddingLeft: 45,
              marginTop: 10,
            }}
            placeholder="Search..."
            onChangeText={event => this.onChangeSearch(event)}
          />
        </View>
        <ScrollView>
          <FlatList
            numColumns={2}
            data={products.products}
            renderItem={this.renderRow}
            refreshing={products.isLoading}
            onRefresh={this.onRefreshing}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>

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
            <Button vertical  onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" />
              <Text>User</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};

export default connect(mapStateToProps)(HomeScreen);
