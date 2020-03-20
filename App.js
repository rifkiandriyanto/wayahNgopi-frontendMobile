import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import store from './src/components/redux/store';
import HomeScreen from './src/components/Home/HomeScreen';
import AddProductScreen from './src/components/Product/addProduct';
import ProductScreen from './src/components/Product/ProductScreen';
import EditProductScreen from './src/components/Product/editProduct';
import DrinkScreen from './src/components/Product/drinkScreen';
import FoodScreen from './src/components/Product/foodScreen';
import LoginScreen from './src/components/auth/Login';
import categoryScreen from './src/components/Category/categoryScreen';
import AddCategoryScreen from './src/components/Category/addCategory';
import EditCategoryScreen from './src/components/Category/editCategory';
import CartScreen from './src/components/Order/cart';
import CheckoutScreen from './src/components/Order/checkout';


const homeNavigator = createStackNavigator({
  Home: LoginScreen,
  HomeScreen: HomeScreen,
  Product: ProductScreen,
  AddProduct: AddProductScreen,
  EditProduct: EditProductScreen,
  Drink: DrinkScreen,
  Food: FoodScreen,
  Category: categoryScreen,
  AddCategory: AddCategoryScreen,
  EditCategory: EditCategoryScreen,
  Cart: CartScreen,
  Checkout: CheckoutScreen,
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