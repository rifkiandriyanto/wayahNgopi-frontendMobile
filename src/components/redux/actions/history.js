import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    payload: axios({
      method: 'GET',
      URL: `${API_KEY}/transaction/history`,
    }),
  };
};

export const getDetailHistory = id => {
  return {
    type: 'GET_DETAIL_HISTORY',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/transaction/history/` + id,
    }),
  };
};

export const getWeeklyHistory = () => {
  return {
    type: 'GET_WEEKLY_HISTORY',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/transaction/history/weekly`,
    }),
  };
};
