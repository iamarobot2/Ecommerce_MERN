import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import ErrorPage from './pages/ErrorPage.jsx';
import RecommendedProducts from './routes/RecommendedProducts.jsx';
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import Cart from './routes/Cart.jsx';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <App />,
      errorElement:<ErrorPage />,
      children:
      [
        {
          path:'/',
          element:<RecommendedProducts />
        },
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/signup',
          element:<Signup />
        },
        {
          path:'/cart',
          element:<Cart />
        }
      ],
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
