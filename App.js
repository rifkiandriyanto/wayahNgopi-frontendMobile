import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider} from 'react-redux';

import store from './src/components/redux/store';
import HomeScreen from './src/components/Home/HomeScreen';
import AddProductScreen from './src/components/Product/addProduct';
import ProductScreen from './src/components/Product/productScreen';
import EditProductScreen from './src/components/Product/editProduct';
import DrinkScreen from './src/components/Product/drinkScreen';
import FoodScreen from './src/components/Product/foodScreen';
// const tabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Product: ProductScreen,
// });

const homeNavigator = createStackNavigator({
  Home: HomeScreen,
  Product: ProductScreen,
  AddProduct: AddProductScreen,
  EditProduct: EditProductScreen,
  Drink: DrinkScreen,
  Food: FoodScreen,
});

const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;