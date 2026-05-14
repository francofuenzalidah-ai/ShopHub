import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import ProductDetailPage from './pages/ProductDetailPage'
import './App.css'
import CartProvider from './context/CartContext'

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:type" element={<AuthPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
