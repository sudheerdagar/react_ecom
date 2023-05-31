import {createContext,useEffect,useState} from 'react';


const addCartItem=(cartItems,productToAdd)=>{
    const existingCartItem=cartItems.find(
        (cartItem)=>{
            if(cartItem.id===productToAdd.id)
            {
                return true;
            }
        
        }
    );

    //if found only increment quantity

    if(existingCartItem)
    {
       const arr=[];
       cartItems.map((cartItem)=>{
        if(cartItem.id===productToAdd.id)
        {
           arr.push({...cartItem,quantity:cartItem.quantity+1});
        }
        else
        {
            arr.push(cartItem);
        }

       })
       return arr;
    }

    return [...cartItems,{...productToAdd,quantity:1}];

    
}

const removeCartItem=(cartItems,cartItemToRemove)=>{
    //find the cart item to remove

    const existingCartItem=cartItems.find(
        (cartItem)=>{
            if(cartItem.id===cartItemToRemove.id)
            {
                return cartItem;
            }
        
        }
    );

    //check if quantity is 1 ,if it is remove that item from cart

    if(existingCartItem.quantity===1)
    {
        return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id)
    }


    if(existingCartItem)
    {
       const arr=[];
       cartItems.map((cartItem)=>{
        if(cartItem.id===cartItemToRemove.id)
        {
           arr.push({...cartItem,quantity:cartItem.quantity-1});
        }
        else
        {
            arr.push(cartItem);
        }

       })
       return arr;
    }




}

const clearCartItem=(cartItems,cartItemToRemove)=>{
    //find the cart item to remove
    return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id)

}




export const CartContext=createContext({
    isCartOpen:false,
    SetIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    cartCount:0,
    removeItemFromCart:()=>{},
    clearItemFromCart:()=>{},
    total:0
});

export const CartProvider=({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [total,setTotal]=useState(0);

 useEffect(()=>{
    const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
    setCartCount(newCartCount);
 },[cartItems]);

   useEffect(()=>{
    const newTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0);
    setTotal(newTotal);
    },[cartItems]);



    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart=(cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }

    const clearItemFromCart=(cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems,cartItemToClear));
    }

    


    const value={isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount,removeItemFromCart,clearItemFromCart,total};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}

