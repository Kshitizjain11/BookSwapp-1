"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { CartItem } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (book: CartItem) => void
  removeFromCart: (bookId: number, type: "buy" | "rent") => void
  updateQuantity: (bookId: number, type: "buy" | "rent", quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
  moveToSaveForLater: (bookId: number, type: "buy" | "rent") => void
  saveForLaterItems: CartItem[]
  moveToCart: (bookId: number, type: "buy" | "rent") => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [saveForLaterItems, setSaveForLaterItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    const storedSaveForLater = localStorage.getItem("saveForLaterItems")
    if (storedSaveForLater) {
      setSaveForLaterItems(JSON.parse(storedSaveForLater))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem("saveForLaterItems", JSON.stringify(saveForLaterItems))
  }, [saveForLaterItems])

  const addToCart = useCallback((book: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === book.id && item.type === book.type && item.rentalDuration === book.rentalDuration,
      )
      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: `${book.title} is already in your cart. Quantity updated.`,
        })
        return prevItems.map((item) =>
          item.id === book.id && item.type === book.type && item.rentalDuration === book.rentalDuration
            ? { ...item, quantity: item.quantity + book.quantity }
            : item,
        )
      } else {
        toast({
          title: "Added to cart",
          description: `${book.title} has been added to your cart.`,
        })
        return [...prevItems, { ...book, quantity: book.quantity || 1 }]
      }
    })
  }, [])

  const removeFromCart = useCallback((bookId: number, type: "buy" | "rent") => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === bookId && item.type === type)))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }, [])

  const updateQuantity = useCallback((bookId: number, type: "buy" | "rent", quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === bookId && item.type === type ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.type === "rent" && item.rentalDuration ? item.rentPrice! * item.rentalDuration : item.price
      return total + price * item.quantity
    }, 0)
  }, [cartItems])

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const moveToSaveForLater = useCallback((bookId: number, type: "buy" | "rent") => {
    setCartItems((prevCart) => {
      const itemToMove = prevCart.find((item) => item.id === bookId && item.type === type)
      if (itemToMove) {
        setSaveForLaterItems((prevSave) => {
          const existingSaveItem = prevSave.find((item) => item.id === bookId && item.type === type)
          if (!existingSaveItem) {
            toast({
              title: "Moved to Save for Later",
              description: `${itemToMove.title} has been moved to your Save for Later list.`,
            })
            return [...prevSave, itemToMove]
          }
          return prevSave
        })
        return prevCart.filter((item) => !(item.id === bookId && item.type === type))
      }
      return prevCart
    })
  }, [])

  const moveToCart = useCallback((bookId: number, type: "buy" | "rent") => {
    setSaveForLaterItems((prevSave) => {
      const itemToMove = prevSave.find((item) => item.id === bookId && item.type === type)
      if (itemToMove) {
        setCartItems((prevCart) => {
          const existingCartItem = prevCart.find((item) => item.id === bookId && item.type === type)
          if (!existingCartItem) {
            toast({
              title: "Moved to Cart",
              description: `${itemToMove.title} has been moved back to your cart.`,
            })
            return [...prevCart, itemToMove]
          }
          return prevCart
        })
        return prevSave.filter((item) => !(item.id === bookId && item.type === type))
      }
      return prevSave
    })
  }, [])

  const value = React.useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      moveToSaveForLater,
      saveForLaterItems,
      moveToCart,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      moveToSaveForLater,
      saveForLaterItems,
      moveToCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
