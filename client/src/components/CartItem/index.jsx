import { useDispatch } from "react-redux";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../Redux/features/cartSlice";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();
  const dispatch_ = useDispatch();

  const RemoveFromCart = (item) => {
    console.log(item);
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: item._id,
    // });
    dispatch_(removeFromCart(item._id));
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch_(removeFromCart(item._id));
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch_(
        updateCartQuantity({
          _id: item._id,
          purchaseQuantity: parseInt(value),
        })
      );
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => RemoveFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
