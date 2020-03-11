import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import Spinner from '../Spinner/Spinner';
import {SearchBar} from 'react-native-elements';

import {getProducts, deleteProduct} from '../redux/actions/product';

class ProductScreen extends Component {
  static navigationOptions = {
    title: 'Product',
  };

  state = {
    activePage: 1,
    sort: 'id',
    by: 'ASC',
    searchName: '',
    activeCategory: '',
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#1C3F94',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            marginRight: 20,
          }}
          onPress={() => navigation.navigate('AddProduct')}>
          <Text style={{color: '#fff'}}>Add Product</Text>
        </TouchableOpacity>
      ),
    };
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
      activeCategory: "",
      searchName: event,
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProducts(data));
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
            Stock {item.stock}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() =>
                this.props.navigation.navigate('EditProduct', {
                  product: item,
                })
              }>
              <Text style={{fontSize: 17, color: 'orange'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={this.onSubmit.bind(this, item.id)}>
              <Text style={{fontSize: 17, color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {products} = this.props;

    return (
      <View>
        <TextInput
          style={{borderWidth:1, borderColor:'#d2d9d5', borderRadius:25, paddingLeft:45, marginTop:30}}
          placeholder="Search..."
          onChangeText={ event => this.onChangeSearch (event) }
        />
        <Spinner isLoading={products.isLoading} />
        <View style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
          <FlatList
            data={products.products}
            renderItem={this.renderRow}
            refreshing={products.isLoading}
            onRefresh={this.onRefreshing}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductScreen);
