import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

const addCartItem = (
    cartItems: CartItem[], 
    productToAdd: CategoryItem
    ): CartItem[] => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id )
    //if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        );
    }
     // return ndew array with modified cartItem/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    //find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id )
    //checkif quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id === cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
    //return back cart item with matching cart item with reduced quantity
}

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem( cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
const newCartItems = removeCartItem( cartItems, cartItemToRemove);
return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
const newCartItems = clearCartItem( cartItems, cartItemToClear);
return setCartItems(newCartItems);
}; 

export type SetIsCartOpen = ActionWithPayload<
CART_ACTION_TYPES.SET_IS_CART_OPEN, 
boolean>;

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))



const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);