import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice(
    {
        name:'cart',
        initialState:
        {
            cartItems:[]
        },
        reducers:
        {
            addToCart:((state,action)=>
            {
                state.cartItems.push(action.payload)
            }),
            incQuantity:((state,action)=>
            {
                state.cartItems = state.cartItems.map((item)=>
                {
                    if(item.product.id===action.payload)
                    {
                        const changedItem = 
                        {
                            ...item,
                            quantity:item.quantity+1
                        }
                        return changedItem
                    }
                    return item
                })
            }),
            decQuantity:((state,action)=>
            {
                state.cartItems=state.cartItems.map((item)=>
                {
                    if(item.product.id===action.payload)
                    {
                        const changedItem = 
                        {
                            ...item,
                            quantity:item.quantity-1
                        }
                        return changedItem
                    }
                    return item
                })
            })
        }
    }
)

export const {addToCart,incQuantity,decQuantity}=cartSlice.actions
export default cartSlice.reducer