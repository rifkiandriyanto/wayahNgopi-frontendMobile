import {manipulateItem, deleteCart} from '../redux/actions/cart';
import React, {Component} from 'react';
import { TextInput, FlatList, View, Image, TouchableOpacity,
ScrollView} from 'react-native';
import {connect} from 'react-redux';

import { 
    Button,
    Text,
    Card,
    CardItem,
    Thumbnail,
    Badge} from 'native-base'
  import Spinner from '../Spinner/Spinner';

  class Cart extends Component {

    addQuantity = data => {
        if (data.quantity < data.stock){
            data.quantity += 1;
            this.props.dispatch(manipulateItem(data));
        }
    };

    removeQuantity = data => {
        if (data.quantity > 1) {
            data.quantity -= 1;
            this.props.dispatch(manipulateItem(data));
        }
    };

    deleteCart = id => {
        this.props.dispatch(deleteCart(id));
    };
render () {
    const ViewCart = () => {
        if (this.props.productIcart.length < 1){
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
                  <Button  small bordered info onPress={() => this.deleteCart(item.ProductId)}>
                  <Text> --- </Text>
                  </Button>
                  <Button  small bordered info onPress={() => this.addToCart(item)}>
                  <Text> + </Text>
                  </Button>
                  <Button  small bordered info onPress={() => this.removeQuantity(item)}>
                  <Text> - </Text>
                  </Button>
                </View>
              </View>
            )
        }

        <FlatList
            numColumns={1}
            data={products.products}
            renderItem={this.renderRow}
            refreshing={products.isLoading}
            onRefresh={this.onRefreshing}
            keyExtractor={item => item.id.toString()}
          />
    }
}


  }

  const mapCartToProps = state => {
      return{
          productIcart: state.cart.cart,
          totalPurchase: state.cart.totalPurchase
      };
  };

  export default connect(mapCartToProps)(Cart);