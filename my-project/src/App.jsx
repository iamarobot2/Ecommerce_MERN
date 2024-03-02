import './App.css'
import Header from './components/Header'
import {Outlet} from 'react-router-dom'

function App() {
  return (
    <>
      <Header className='container' />
      <main className='container mx-auto py-12 px-10 Toastify--animate Toastify__bounce-enter--top-center'>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}

export default App
