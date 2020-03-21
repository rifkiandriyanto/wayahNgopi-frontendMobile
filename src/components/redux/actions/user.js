import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const addUser = data => {
  return {
    type: 'POST_USER',
    payload: axios({
      method: 'POST',
      url: `${API_KEY}/user/register`,
      data: data,
    }),
  };
};

export const updateUser = (data, userId) => {
  return {
    type: 'UPDATE_USER',
    payload: axios({
      method: 'PATCH',
      url: `${API_KEY}/user/${userId}`,
      data: data,
    }),
  };
};

export const getUser = id => {
  return {
    type: 'GET_USER',
    payload: axios({
      url: `${API_KEY}/user?=${id}}`,
    }),
  };
};
