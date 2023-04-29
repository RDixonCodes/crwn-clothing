import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils';

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

    const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
    

export const CartContext = createContext ({
    isCartOpen: false,
    setIscartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    CartTotal: 0
})


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    CartTotal: 0
}

const CART_ACTIONS_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;


    switch(type){
        case CART_ACTIONS_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };

        case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);



    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(
            createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,{ 
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount})
        );
    }


    const addItemToCart = (productToAdd) => {
            const newCartItems = (addCartItem( cartItems, productToAdd));
            updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItem( cartItems, cartItemToRemove));
        updateCartItemsReducer(newCartItems);
};

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = (clearCartItem( cartItems, cartItemToClear));
        updateCartItemsReducer(newCartItems);
    }; 

    const setIsCartOpen =(bool) => {

        dispatch(createAction( CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool ));
    }

    const value = { isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
