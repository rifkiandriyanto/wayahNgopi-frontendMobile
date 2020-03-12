import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import Spinner from '../Spinner/Spinner';

import {getCategories, deleteCategory} from '../redux/actions/category';

class CategoryScreen extends Component {


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
          onPress={() => navigation.navigate('AddCategory')}>
          <Text style={{color: '#fff'}}>Add Category</Text>
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
      <View>
        <Spinner isLoading={categories.isLoading} />
        <View style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
          <FlatList
            data={categories.categories}
            renderItem={this.renderRow}
            refreshing={categories.isLoading}
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
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryScreen);
