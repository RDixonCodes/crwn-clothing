import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id )
    //if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        );
    }
     // return ndew array with modified cartItem/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id )
    //checkif quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id === cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
    //return back cart item with matching cart item with reduced quantity
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = (addCartItem( cartItems, productToAdd));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
const newCartItems = (removeCartItem( cartItems, cartItemToRemove));
return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
const newCartItems = (clearCartItem( cartItems, cartItemToClear));
return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}; 

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);