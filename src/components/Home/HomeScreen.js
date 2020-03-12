import React, {Component} from 'react';
import {connect} from 'react-redux';
import { postCart } from '../redux/actions/cart'
import {
  TextInput,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { 
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Badge} from 'native-base'
import Spinner from '../Spinner/Spinner';
import {SearchBar} from 'react-native-elements';

import {getProducts, deleteProduct} from '../redux/actions/product';

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

  onSubmit = async productId => {
    await this.props.dispatch(deleteProduct(productId));
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
          <Button  small bordered info onPress={() => this.addToCart(item)}>
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
        <View style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
          <FlatList
            numColumns={2}
            data={products.products}
            renderItem={this.renderRow}
            refreshing={products.isLoading}
            onRefresh={this.onRefreshing}
            keyExtractor={item => item.id.toString()}
          />

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

          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Cart')}
            style={{
              backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 10, color: '#545454', marginTop: 4}}>
              Cart
            </Text>
            <Badge><Text>{this.props.totalPurchase}</Text></Badge>
          </TouchableOpacity>
        </View>


        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase
    
  };
};

export default connect(mapStateToProps)(HomeScreen);
