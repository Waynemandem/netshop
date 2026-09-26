import { useContext } from 'react'
import { CartContext } from './CartState'

export function useCart() {
  return useContext(CartContext)
}
