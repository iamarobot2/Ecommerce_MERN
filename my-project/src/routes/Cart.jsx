import { useDispatch, useSelector } from "react-redux"
import { decQuantity, incQuantity } from "../features/cart/cartSlice"
import { useEffect, useState } from "react"

function Cart() {
  const [totalprice,settotalprice] = useState(0)
  const items = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(items.length>0)
    {
      let currentTotal = 0
      for(let i=0;i<items.length;i++)
      {
        const item = items[i]
        const itemPrice = item.product.price * item.quantity
        currentTotal =  (itemPrice+currentTotal)
     }
     settotalprice(currentTotal.toFixed(2))
    }
  },[items])
  return (
    <section>
      <h1 className="text-2xl font-semibold">Items in cart</h1>
      {items.length===0 && <span className=" flex items-center justify-center">No items in Cart</span>}
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="flex w-full lg:w-3/4 order-2">
        {
          items && 
          <ul className="grid gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6">
            {
              items.map((item)=>
              {
                return(
                  <li key={item.product.id} className="flex flex-col">
                      <img src={item.product.image} alt={item.product.title + " " + "image"} className="w-full aspect-square object-contain object-center mb-3" />
                      <h3 className="font-semibold">{item.product.title}</h3>
                      <span>{(item.product.price * item.quantity)}$</span>
                      <div className="flex">
                        <span>Quantity :&nbsp;</span><button onClick={()=>dispatch(decQuantity(item.product.id))} className="border w-6 h-6 flex flex-row justify-center items-center mx-1 hover:bg-purple-300 rounded-md">-</button>
                        <span>{item.quantity}</span><button onClick={()=>dispatch(incQuantity(item.product.id))} className="border w-6 h-6 flex flex-row justify-center items-center mx-1 hover:bg-purple-300 rounded-md">+</button>
                      </div>
                  </li>
                )
              })
            }
          </ul>
        }
        </div>
        <div className="lg:border-l lg:pl-4 flex flex-col  lg:w-3/12 order-2">
          {
            items.length>0 &&
            <div>
              <h3 className=" text-lg font-semibold">Price Details</h3>
              <span>Total  Price : ${totalprice}</span><br/>
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default Cart