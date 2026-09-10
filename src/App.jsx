import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
