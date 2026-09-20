import ProductGrid from './ProductGrid';
import { CartProvider } from './CartContext'
import Checkout from './Checkout'



function App() {
  return (
    <CartProvider>
      <ProductGrid />
      <Checkout />
    </CartProvider>
  )
}

export default App