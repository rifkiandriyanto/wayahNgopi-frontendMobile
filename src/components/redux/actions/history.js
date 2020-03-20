import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    payload: axios({
      method: 'GET',
      URL: `${API_KEY}/transaction`,
    }),
  };
};

export const getDetailHistory = id => {
  return {
    type: 'GET_DETAIL_HISTORY',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/transaction` + id,
    }),
  };
};
