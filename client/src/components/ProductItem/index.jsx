import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQuantity } from "../../Redux/features/cartSlice";

function ProductItem(item) {
  const dispatch_ = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { image, name, _id, price, quantity } = item;

  const AddToCart = () => {
    console.log(cart);
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch_(
        updateCartQuantity({
          _id: _id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        })
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch_(addToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={AddToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
