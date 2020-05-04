import {combineReducers} from 'redux';
import cart from './cart';
import products from './product';
import categories from './category';
import user from './user';
import auth from './auth';
import histories from './history';
export default combineReducers({
  products,
  categories,
  cart,
  user,
  auth,
  histories
});
