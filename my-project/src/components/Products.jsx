/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import CTAButton from './CTAButton';

function Product(props) {
    const dispatch = useDispatch()
    const product = props.product
    return (
        <li className='flex flex-col justify-between'> 
            <div>
                <img src={product.image} alt='dress' className='w-full aspect-square object-contain object-center'/>
                <h3>{product.title}</h3>
                <span>{product.price}$</span>
            </div>
            <CTAButton action={()=>{dispatch(addToCart({product:product,quantity:1}))}} text="Add to cart" />
        </li>
    );
}

export default Product;