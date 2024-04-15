import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // Updates the products state with a new array of products passed in the action
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // Adds a new product to the cart state and opens the cart
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    // Adds an array of products to the cart state
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // Updates the quantity of a product in the cart based on the product's id
    // and the new quantity passed in the action
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // Removes a product from the cart state based on the product's id passed in the action
    // If the cart becomes empty, cartOpen is set to false
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    // Clears the cart state and closes the cart
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    // Toggles the cartOpen state between true and false
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    // Updates the categories state with a new array of categories passed in the action
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    // Updates the currentCategory state with the new category passed in the action
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // Default case - If no matching action type is found, return the current state
    default:
      return state;
  }
};
