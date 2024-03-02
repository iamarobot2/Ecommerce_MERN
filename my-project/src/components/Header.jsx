import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CTALink from './CTALink';
function Header() {
  const cartItems = useSelector(state=>state.cart.cartItems)
    return (
        <>
          <header className='shadow-lg p-4 h-20 flex flex-row justify-between items-center '>
        <span className=''>Basics</span>
        <nav className='hidden xl:block'>
          <ul className='flex flex-row gap-x-6'>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={''}>About</Link>
            </li>
            <li>
              <Link to={''}>Products</Link>
            </li>
            <li>
              <Link to={''}>Contact US</Link>
            </li>
          </ul>
        </nav>
        <div className='flex flex-row gap-3 items-center justify-center'>
          {/* <Link to={'/user'}>
            <img src='/icons/usericon.svg' className='w-6 h-6' />
          </Link> */}
          <CTALink link="/login" text="Login" />
          <Link to={'/cart'}>
            <div className='flex flex-row justify-center'>
              <img src='/icons/cart.svg' className='w-6 h-6' />
              <span className='font-bold text-xs text-red-500'>{cartItems.length}</span>
            </div>
          </Link>
          <button className='xl:hidden'>
            <img src='/icons/menu.svg' alt='menu button' className='w-6 h-6' />
          </button>
        </div>
      </header>
        </>
    );
}

export default Header;