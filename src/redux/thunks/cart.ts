import { Dispatch } from "redux";
import { setCartItems, deleteCartItem, setCartLoading } from "../Actions";
import ProductType from "../../models/Product.model";

export const fetchCart = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setCartLoading(true));
    const res = await fetch(`http://localhost:8000/cart`);
    const data = await res.json();

    dispatch(setCartItems(data));
  } catch (error) {
    console.log("Error " + error);
  }
  finally {
    dispatch(setCartLoading(false));
  }
};

export const removeItemFromCart = (productId: number) => async (dispatch: Dispatch) => {
  try {
    await fetch(`http://localhost:8000/cart/${productId}`, {
      method: "DELETE",
    });
    dispatch(deleteCartItem(productId));
  } catch (error) {
    console.log("Error " + error);
  }
};

export const updateCartItemCount = (productId: number, count: number) => async () => {
  try {
    fetch(`http://localhost:8000/cart/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: count,
      }),
    });
  } catch (error) {
    console.log("Error " + error);
  }
}

export const addItemToCart = (product: ProductType, count: number) => async () => {
  try {
    fetch("http://localhost:8000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product.id,
        title: product.title,
        count: count,
        price: product.price,
      }),
    });
  } catch (error) {
    console.log("Error " + error);
  }
};
