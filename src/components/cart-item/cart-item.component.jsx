import { CartItemContainer, ItemDetail } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {

    const { name, imageUrl, price, quantity } = cartItem;

    return(
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetail>
                <span>{name}</span>
            <span className='price'>{quantity} x ${price}</span>   
            </ItemDetail>
        </CartItemContainer>
    )
}

export default CartItem;