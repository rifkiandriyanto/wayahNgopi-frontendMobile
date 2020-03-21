import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const getProducts = () => {
  // const limit = 6;
  // const page = data.activePage || 1;
  // const category = data.activeCategory || '';
  // const name = data.searchName || '';
  // const sortBy = data.sort || 'id';
  // const sort = data.by || 'ASC';
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/product`,
    }),
  };
};

export const postProduct = data => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      method: 'POST',
      url: `${API_KEY}/product`,
      data: data,
    }),
  };
};

export const deleteProduct = productId => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `${API_KEY}/product/${productId}`,
    }),
  };
};

export const updateProduct = (productId, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `${API_KEY}/product/${productId}`,
      data: data,
    }),
  };
};
