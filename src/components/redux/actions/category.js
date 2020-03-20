import axios from "axios";
import {API_KEY} from 'react-native-dotenv';

export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    payload: axios({
      method: "GET",
      url: `${API_KEY}/category`
    })
  };
};

export const postCategory = data => {
  return {
    type: "POST_CATEGORY",
    payload: axios({
      method: "POST",
      url: `${API_KEY}/category`,
      data: data
    })
  };
};

export const deleteCategory = categoryId => {
  return {
    type: "DELETE_CATEGORY",
    payload: axios({
      method: "DELETE",
      url: `${API_KEY}/category/${categoryId}`
    })
  };
};
export const updateCategory = (categoryId, data) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: axios({
      method: "PATCH",
      url: `${API_KEY}/category/${categoryId}`,
      data: data
    })
  };
};
