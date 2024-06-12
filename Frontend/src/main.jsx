import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Button } from './components/ui/button.jsx'
import './index.css'
import {
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements
} from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Layout from './Layout.jsx'
import Products from './pages/Products.jsx'
import SellerLogin from './pages/sellers/Login.jsx'
import SellerRegister from './pages/sellers/Register.jsx'
import CustomerLogin from './pages/customers/Login.jsx'
import CustomerRegister from './pages/customers/Register.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Products />} />
      <Route path="seller">
        <Route path="login" element={<SellerLogin />} />
        <Route path="register" element={<SellerRegister />} />
        </Route>
      <Route path="customer">
        <Route path="login" element={<CustomerLogin />} />
        <Route path="register" element={<CustomerRegister />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
