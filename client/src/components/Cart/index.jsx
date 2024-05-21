import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../Redux/features/cartOpenSlice";
import { addMultipleToCart } from "../../Redux/features/cartSlice";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const dispatch_ = useDispatch();

  const ToggleCartState = useSelector((state) => state.cartOpen);
  const CartState = useSelector((state) => state.cart);

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      console.log("cart:", cart);
      // dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      dispatch_(addMultipleToCart(cart));
    }

    // if (!state.cart.length) {
    //   getCart();
    // }
    if (!CartState.length) {
      getCart();
    }
  }, [CartState.length]);

  function toggleCartbtn() {
    console.log(CartState);
    dispatch_(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    // state.cart.forEach((item) => {
    //   sum += item.price * item.purchaseQuantity;
    // });

    CartState.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });

    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    // state.cart.forEach((item) => {
    //   for (let i = 0; i < item.purchaseQuantity; i++) {
    //     productIds.push(item._id);
    //   }
    // });
    CartState.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!ToggleCartState) {
    return (
      <div className="cart-closed" onClick={toggleCartbtn}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCartbtn}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {CartState.length ? (
        <div>
          {CartState.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
