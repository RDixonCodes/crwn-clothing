import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import { CartItem } from '../../store/cart/cart.types';

import { 
    BaseSpan, 
    Arrow, 
    CheckoutItemContainer, 
    ImageContainer, 
    Quantity, 
    Value,
    RemoveButton
} from './checkout-items.styles';

type CheckoutItemProps = {
    cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) =>{

    const dispatch = useDispatch();
    // const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    const { name, imageUrl, price, quantity } = cartItem;
    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                &#10094;
                </Arrow>
                <Value>
                {quantity}
                </Value>
                <Arrow onClick={addItemHandler}>
                  &#10095;  
                </Arrow>
            </Quantity>
            <BaseSpan>${price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}
export default CheckoutItem;