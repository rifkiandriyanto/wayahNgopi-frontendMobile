import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider} from 'react-redux';

import store from './src/components/redux/store';
import HomeScreen from './src/components/Home/HomeScreen';
import addProductScreen from './src/components/Product/addProduct';
// import EditProduct from './src/components/Product/editProduct';

const tabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
});

const homeNavigator = createStackNavigator({
  Home: tabNavigator,
  AddProduct: addProductScreen,
  // EditProduct: editProductScreen,
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
