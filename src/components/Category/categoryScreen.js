import React, {Component} from 'react';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import Spinner from '../Spinner/Spinner';
import {
  Container,
  Header,
  Content,
  Footer,
  Text,
  FooterTab,
  Button,
  Icon,
  Badge,
} from 'native-base';

import {getCategories, deleteCategory} from '../redux/actions/category';

class CategoryScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: null,
      // headerTransparent: true,
      headerStyle: { backgroundColor: '#324191',},
      headerLeft: null,
      headerRight: () => (
              <TouchableOpacity style={{marginRight:180}}
                onPress={() => navigation.navigate('AddCategory')}>
               <Ionicons name="ios-add-circle" size={40} color="#b6caff"></Ionicons>
              </TouchableOpacity>
            ),
    };
  };

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    await this.props.dispatch(getCategories());
  }

  onSubmit = async categoryId => {
    await this.props.dispatch(deleteCategory(categoryId));
  };

  onRefreshing = () => {
    this.getCategories();
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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() =>
                this.props.navigation.navigate('EditCategory', {
                  category: item,
                })
              }>
              <Text style={{fontSize: 17, color: 'orange'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={this.onSubmit.bind(this, item.id)}><Text style={{fontSize: 17, color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {categories} = this.props;

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Spinner isLoading={categories.isLoading} />
        <ScrollView>
          <FlatList
            data={categories.categories}
            renderItem={this.renderRow}
            refreshing={categories.isLoading}
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
    categories: state.categories,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};

export default connect(mapStateToProps)(CategoryScreen);
