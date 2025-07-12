import type React from "react"
export type Book = {
  id: string
  title: string
  author: string
  price?: number // Optional for books that are only for rent
  rentPrice?: number // Optional for books that are only for sale
  condition: string
  genre: string
  image: string
  rating: number
  reviews: number
  seller: string
  location: string
  delivery: boolean
  pickup: boolean
}

export type CartItem = {
  id: string
  title: string
  author: string
  price: number // Price if buying
  rentPrice?: number // Price per week if renting
  image: string
  condition: string
  quantity: number
  type: "buy" | "rent"
  rentalDuration?: number // in weeks, only for rent type
  seller: string
}

export type OrderItem = {
  bookId: string
  title: string
  author: string
  price: number // Actual price paid (either buy price or total rental price)
  image: string
  quantity: number
  type: "buy" | "rent"
  rentalDuration?: number // in weeks, only for rent type
}

export type Order = {
  id: string
  items: OrderItem[]
  totalAmount: number
  status: "Paid" | "Shipped" | "Delivered" | "Cancelled"
  orderDate: string // ISO string
  paymentMethod: "Credit Card" | "UPI" | "Wallet"
  deliveryAddress?: string
}

export type Rental = {
  id: string
  bookId: string
  title: string
  author: string
  image: string
  rentalPrice: number // Price per week
  rentalDuration: number // in weeks
  startDate: string // ISO string
  dueDate: string // ISO string
  status: "Active" | "Overdue" | "Returned" | "Cancelled"
  seller: string
}

export type Notification = {
  id: string
  type: "order" | "rental" | "message" | "wishlist" | "seller"
  icon: React.ReactNode
  title: string
  description: string
  date: string // ISO string
  link?: string
  read: boolean
}
