export const login = () => ({
  type: 'SIGN_IN',
});

export const logout = () => ({
  type: 'SIGN_OUT',
});

export const customerLogin = () => ({
  type: 'CUSTOMER',
});

export const restaurantLogin = () => ({
  type: 'RESTAURANT',
});

// incoming field, data ==> infield, payload
export const update = (infield, payload) => ({
  type: 'UPDATE',
  field: infield,
  payload,
});

export const updateCart = (infield, payload) => ({
  type: 'UPDATECART',
  field: infield,
  payload,
});

export const loadRestaurants = (countPerPage, payload) => ({
  type: 'LOAD_DATA',
  countPerPage,
  payload,
});

export const filterRestaurantByDelivery = (payload) => ({
  type: 'FILTER_BY_DELIVERY',
  payload,
});

export const filterRestaurantByLocation = (nbrLatitude, nbrLongitude) => ({
  type: 'FILTER_BY_LOCATION',
  nbrLatitude,
  nbrLongitude,
});

export const loadNewPage = (payload) => ({
  type: 'LOAD_NEW_PAGE',
});
