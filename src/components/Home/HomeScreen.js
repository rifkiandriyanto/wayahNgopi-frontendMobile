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
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Badge,
  Icon,
} from 'native-base';
import Spinner from '../Spinner/Spinner';

import {getProducts} from '../redux/actions/product';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

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

  renderRow = ({item}) => {
    return (
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
        <View style={{padding: 10, width: 155}}>
          <Text style={{color: '#777', paddingTop: 0}}>{item.name}</Text>
          <Text style={{color: '#777', paddingTop: 0}}>Rp.{item.price}</Text>
          <Button small bordered info onPress={() => this.addToCart(item)}>
            <Text> Add to cart </Text>
          </Button>
        </View>
      </View>
    );
  };

  render() {
    console.disableYellowBox = true;
    const {products} = this.props;

    return (
      <ScrollView>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d2d9d5',
            borderRadius: 25,
            paddingLeft: 45,
            marginTop: 30,
          }}
          placeholder="Search..."
          onChangeText={event => this.onChangeSearch(event)}
        />
        <Spinner isLoading={products.isLoading} />
       
          <FlatList
            numColumns={2}
            data={products.products}
            renderItem={this.renderRow}
            refreshing={products.isLoading}
            onRefresh={this.onRefreshing}
            keyExtractor={item => item.id.toString()}
          />

          <View
            style={{
              height: 54,
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
            <Button
              vertical
              info
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>

            <Button
              vertical
              info
              onPress={() => this.props.navigation.navigate('Product')}>
              <Icon name="folder" />
              <Text>Products</Text>
            </Button>

            <Button
              vertical
              info
              onPress={() => this.props.navigation.navigate('Category')}>
              <Icon name="document" />
              <Text>Category</Text>
            </Button>
                  
            <Button active badge vertical info
              onPress={() => this.props.navigation.navigate('Cart')}
              >
                 <Badge >
                <Text>{this.props.totalPurchase}</Text>
              </Badge>
                <Icon active name="cart" style={{marginTop: -26}} />
              <Text>Cart</Text>             
            </Button>
          </View>
       
      </ScrollView>
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
