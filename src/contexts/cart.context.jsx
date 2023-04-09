import { createContext, useEffect, useState } from "react";

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
        return cartItems.filter(cartItem => cartItem.id === cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
    //return back cart item with matching cart item with reduced quantity
}


export const CartContext = createContext ({
    isCartOpen: false,
    setIscartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [ cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
            setCartItems(addCartItem( cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem( cartItems, cartItemToRemove));
};

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
