import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';

import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Icon,
  View,
  Item,
  Input,
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

import {FlatList} from 'react-native';
// import {} from 'react-native';
import {checkout} from '../redux/actions/cart';
import {getProducts} from '../redux/actions/product';

class Checkout extends Component {
  static navigationOptions = {
    header: null,
  };


  state = {
    tPrice: 0,
    paymentAmount: 0,
    change: 0,
    Disabled: true,
  };

  paymentAmount = e => {
    this.setState({
      pay: e,
    });

    if (parseInt(e) >= this.state.tPrice) {
      this.setState({
        change: e - this.state.tPrice,
        Disabled: false,
      });
    } else {
      this.setState({change: 0, Disabled: true});
    }
  };

  checkout = () => {
    alert('success');
    const data = {
        id_transaction: `${uuid()}`,
      products: this.props.productsInCart,
    };
    this.props.dispatch(checkout(data));
    this.props.navigation.navigate('HomeScreen');
  };
  componentDidMount() {
    const productsInCart = this.props.navigation.getParam('products');
    var total = 0;
    productsInCart.map(e => {
      total += e.price * e.quantity;
    });
    this.setState({
      tPrice: total,
    });
  }
  componentDidUpdate() {
    this.props.dispatch(getProducts({}));
  }
  render() {
    return (
      <Container>
        <Grid>
          <Col>
            <Content>
              <FlatList
                data={this.props.productsInCart}
                onRefresh={this.onRefreshing}
                renderItem={({item}) => (
                  <Card style={{marginBottom: -2, marginTop: -2}}>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>Rp. {item.price}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.quantity}</Text>
                          <Text> x {item.price}</Text>
                        </View>
                      </Right>
                    </CardItem>
                  </Card>
                )}
                keyExtractor={item => item.productId.toString()}
              />
              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <Text>total: Rp. {this.state.tPrice}</Text>
                <Item>
                  <Input
                    placeholder="User Payment"
                    onChangeText={text => this.paymentAmount(text)}
                    value={this.state.paymentAmount}
                  />
                </Item>
                <Text>Change: {this.state.change}</Text>
              </View>
              <Button
                onPress={() => this.checkout()}
                info
                disabled={this.state.Disabled}
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 18,
                  marginTop: 10,
                }}>
                <Icon name="checkbox" />
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  Checkout
                </Text>
              </Button>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}
const mapCart = state => {
  return {
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};
export default connect(mapCart)(Checkout);
