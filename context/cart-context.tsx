"use client"

import { useMemo } from "react"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import type { CartItem } from "@/lib/types"

interface CartContextType {
  cartItems: CartItem[]
  saveForLaterItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, type: "buy" | "rent") => void
  updateQuantity: (id: string, type: "buy" | "rent", quantity: number) => void
  getCartTotal: () => number
  getCartItemCount: () => number
  clearCart: () => void
  moveToSaveForLater: (id: string, type: "buy" | "rent") => void
  moveToCart: (id: string, type: "buy" | "rent") => void
  setSaveForLaterItems: React.Dispatch<React.SetStateAction<CartItem[]>> // Expose setter for direct manipulation
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [saveForLaterItems, setSaveForLaterItems] = useState<CartItem[]>([])

  // Load cart and save for later from localStorage on mount
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

  // Save cart and save for later to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem("saveForLaterItems", JSON.stringify(saveForLaterItems))
  }, [saveForLaterItems])

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.type === item.type && i.rentalDuration === item.rentalDuration,
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        return [...prevItems, { ...item, quantity: item.quantity || 1 }]
      }
    })
  }, [])

  const removeFromCart = useCallback((id: string, type: "buy" | "rent") => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => !(item.id === id && item.type === type))
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
        variant: "default",
      })
      return newItems
    })
  }, [])

  const updateQuantity = useCallback((id: string, type: "buy" | "rent", quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id && item.type === type
          ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
          : item,
      )
    })
  }, [])

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.type === "buy" ? item.price : (item.rentPrice || 0) * (item.rentalDuration || 1)
      return total + itemPrice * item.quantity
    }, 0)
  }, [cartItems])

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const moveToSaveForLater = useCallback((id: string, type: "buy" | "rent") => {
    setCartItems((prevCart) => {
      const itemToMove = prevCart.find((item) => item.id === id && item.type === type)
      if (itemToMove) {
        setSaveForLaterItems((prevSFL) => {
          // Check if already in save for later
          const existsInSFL = prevSFL.some((sflItem) => sflItem.id === id && sflItem.type === type)
          if (!existsInSFL) {
            toast({
              title: "Moved to Save for Later",
              description: `${itemToMove.title} has been moved to your 'Saved for Later' list.`,
              variant: "default",
            })
            return [...prevSFL, itemToMove]
          }
          return prevSFL
        })
        return prevCart.filter((item) => !(item.id === id && item.type === type))
      }
      return prevCart
    })
  }, [])

  const moveToCart = useCallback((id: string, type: "buy" | "rent") => {
    setSaveForLaterItems((prevSFL) => {
      const itemToMove = prevSFL.find((item) => item.id === id && item.type === type)
      if (itemToMove) {
        setCartItems((prevCart) => {
          const existingItemIndex = prevCart.findIndex(
            (i) =>
              i.id === itemToMove.id && i.type === itemToMove.type && i.rentalDuration === itemToMove.rentalDuration,
          )
          if (existingItemIndex > -1) {
            const updatedItems = [...prevCart]
            updatedItems[existingItemIndex].quantity += itemToMove.quantity
            return updatedItems
          } else {
            toast({
              title: "Moved to Cart",
              description: `${itemToMove.title} has been moved back to your cart.`,
              variant: "default",
            })
            return [...prevCart, itemToMove]
          }
        })
        return prevSFL.filter((item) => !(item.id === id && item.type === type))
      }
      return prevSFL
    })
  }, [])

  const value = useMemo(
    () => ({
      cartItems,
      saveForLaterItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartItemCount,
      clearCart,
      moveToSaveForLater,
      moveToCart,
      setSaveForLaterItems,
    }),
    [
      cartItems,
      saveForLaterItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartItemCount,
      clearCart,
      moveToSaveForLater,
      moveToCart,
      setSaveForLaterItems,
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
