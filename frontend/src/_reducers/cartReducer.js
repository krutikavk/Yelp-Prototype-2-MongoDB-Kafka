const initialCartState = {
  cartContents: [],

};

const emptyCart = {
  did: '',
  dname: '',
  rid: '',
  dquantity: '',
  dprice: '',
  ooption: '',
  oaddress: '',
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'UPDATECART': {
      switch (action.field) {
        case 'ADD': {
          // Add to cart
          const { did } = action.payload;
          let newcontents;
          // Loose equality--match string/number
          // Q-Why search for index?
          /* A-Because when we delete a complete entry from the cart, cart id does not
          ** coincide with cartContents' index!
          ** delete entry 0, then delete 1, will not find state.cartContents[cartid].dquantity
          */
          // eslint-disable-next-line
          const index = state.cartContents.findIndex((x) => x.did == did);
          if (index === -1) {
            /*
            newcontents =  [
              ...state,
              {
                dname: action.payload.dname,            //dish name
                rid: action.payload.rid,              //restaurant
                dquantity: action.payload.dquantity,        //dish quantity
                dprice: action.payload.dprice,           //dish price
                ooption: action.payload,          //Delivery/Pickup
                oaddress: action.payload
              }
            ]
            */

            newcontents = [...state.cartContents];
            newcontents.push(action.payload);
            let newState = {
              cartContents: newcontents,
            };
            return newState;
          } else {
            newcontents= [...state.cartContents];
            newcontents[index].dquantity++;
          }
          let newState = {
            cartContents: newcontents,
          };
          return newState;
        }
        // send entry number in cart to be deleted
        case 'DELETE': {
          let newcontents = [...state.cartContents];
          let { did } = action.payload;

          // Q-Why search for index?
          /* A-Because when we delete a complete entry from the cart, cart id does not
          ** coincide with cartContents' index!
          ** (delete entry 0 and then delete 1--will not find state.cartContents[cartid].dquantity)
          */
          // eslint-disable-next-line eqeqeq
          let index = state.cartContents.findIndex((x) => x.did == did);
          if (state.cartContents[index].dquantity === 1) {
            // Loose equality--match string/number
            newcontents = newcontents.filter(entry => (entry.did != did))
          } else {
            newcontents = [...state.cartContents];
            newcontents[index].dquantity--;
          }

          let newState = {
            cartContents: newcontents,
          };
          return newState;
        }

        case 'ORDER': {
          let temp = initialCartState;
          return temp;
        }

        default: {
          return state;
        }
      }
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
