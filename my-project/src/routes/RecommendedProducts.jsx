import Product from '../components/Products'
import { useEffect } from 'react'
import { useState } from 'react'


function RecommendedProducts() {
    const [products,setProducts]=useState([])
  useEffect(()=>
  {
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then(data=>setProducts(data))
    .catch(err=>console.log(err))
  },[])
    return (
        <section>
          <h2 className='text-2xl'>Recommended Products</h2>
          <ul className='mt-6 grid gap-6 xl:gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {
              products.map((product)=>{
                return(
                  <Product key={product.id} product={product} />
                )
              })
            }
          </ul>
        </section>
    );
}

export default RecommendedProducts;