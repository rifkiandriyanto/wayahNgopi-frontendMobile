import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider} from 'react-redux';

import store from './src/components/redux/store';
import HomeScreen from './src/components/Home/HomeScreen';
import addProductScreen from './src/components/Product/addProduct';
import ProductScreen from './src/components/Product/ProductScreen';
// import EditProduct from './src/components/Product/editProduct';


const homeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Product: ProductScreen,
    AddProduct: addProductScreen,
  }
)

const AppNavigator = createSwitchNavigator(
  {
      Home: homeNavigator,
      Product: ProductScreen
  }
);

const AppContainer =  createAppContainer(AppNavigator);

function App(){
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App;