import './checkout-item.styles.scss';
import {useContext} from 'react';
import {CartContext} from '../../context/cart.context';

const CheckoutItem=({cartItem})=>{
 const {name,quantity,price,imageUrl}=cartItem;


 const clearItemHandler=()=>clearItemFromCart(cartItem);


 
 const {addItemToCart,removeItemFromCart,clearItemFromCart}=useContext(CartContext);

 return (
        <div className='checkout-item-container'>
        <div className='image-container'>
        <img src={imageUrl} alt={name}/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
        
        <div className='arrow' onClick={()=>removeItemFromCart(cartItem)}>&#10094; </div>
         <div className='value'>{quantity}</div>
        <div className='arrow' onClick={()=>addItemToCart(cartItem)}> &#10095;</div>
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={clearItemHandler} >&#10005;</div>
        </div>
 )
}

export default CheckoutItem;