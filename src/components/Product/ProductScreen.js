import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import {getProducts, deleteProduct} from '../redux/actions/product';
import {
  Container,
  Header,
  Content,
  Footer,
  Text,
  FooterTab,
  Button,
  Badge,
  Icon,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

class ProductScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: null,
      // headerTransparent: true,
      headerStyle: { backgroundColor: '#324191',},
      headerLeft: null,
      headerRight: () => (
              <TouchableOpacity style={{marginRight:180}}
                onPress={() => navigation.navigate('AddProduct')}>
               <Ionicons name="ios-add-circle" size={40} color="#b6caff"></Ionicons>
              </TouchableOpacity>
            ),
    };
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

  onSubmit = async productId => {
    await this.props.dispatch(deleteProduct(productId));
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,.1)',
          height: 110,
        }}>
        <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: 18, marginLeft: 10, marginBottom: 5}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 18}}>
            {this.convertToRupiah(item.price)}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() =>
                this.props.navigation.navigate('EditProduct', {
                  product: item,
                })
              }>
              <Ionicons name="ios-create" size={30} color="#869ac4"></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={this.onSubmit.bind(this, item.id)}>
              <Ionicons name="ios-trash" size={30} color="#637291"></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
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
              vertical
              onPress={() => this.props.navigation.navigate('Category')}>
              <Icon name="document" />
              <Text>Category</Text>
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

export default connect(mapStateToProps)(ProductScreen);
