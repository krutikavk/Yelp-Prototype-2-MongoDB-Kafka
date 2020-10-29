import { combineReducers } from 'redux';
import loggedReducer from './isLogged';
import custReducer from './custProfile';
import restReducer from './restProfile';
import whoIsLoggedReducer from './whoislogged';
import cartReducer from './cartReducer';
import restaurantDisplayReducer from './restaurantDisplayReducer';

const allReducer = combineReducers({
  // equivalent: counterReducer: counterReducer
  // JS6 shorthand: counterReducer
  isLogged: loggedReducer,
  custProfile: custReducer,
  restProfile: restReducer,
  whoIsLogged: whoIsLoggedReducer,
  cart: cartReducer,
  restDisplay: restaurantDisplayReducer,
});

export default allReducer;
