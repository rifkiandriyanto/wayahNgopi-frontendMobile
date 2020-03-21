import axios from 'axios'
import {API_KEY} from 'react-native-dotenv';

export const login = (data) => {
    console.log('ini action', data)
  return {
    type: 'LOGIN_USER',
    payload: axios({
      method: 'POST',
      url: `${API_KEY}/user/login`,
      data: data
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER'
  }
}