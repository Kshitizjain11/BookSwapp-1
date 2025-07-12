import type { Order, Rental } from "./types"

export const mockOrders: Order[] = [
  {
    id: "ORD-20240701-001",
    items: [
      {
        bookId: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 15.99,
        image: "/placeholder.svg?height=300&width=200",
        quantity: 1,
        type: "buy",
      },
      {
        bookId: 4,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 16.99,
        image: "/placeholder.svg?height=300&width=200",
        quantity: 1,
        type: "buy",
      },
    ],
    totalAmount: 35.62, // 15.99 + 16.99 + tax + shipping
    status: "Delivered",
    orderDate: "2024-07-01T10:00:00Z",
    paymentMethod: "Credit Card",
    deliveryAddress: "123 Main St, Anytown, CA 90210",
  },
  {
    id: "ORD-20240625-002",
    items: [
      {
        bookId: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 18.99,
        image: "/placeholder.svg?height=300&width=200",
        quantity: 1,
        type: "buy",
      },
    ],
    totalAmount: 25.51, // 18.99 + tax + shipping
    status: "Shipped",
    orderDate: "2024-06-25T14:30:00Z",
    paymentMethod: "Wallet",
    deliveryAddress: "456 Oak Ave, Otherville, NY 10001",
  },
]

export const mockRentals: Rental[] = [
  {
    id: "RENT-20240705-001",
    bookId: 3,
    title: "Dune",
    author: "Frank Herbert",
    image: "/placeholder.svg?height=300&width=200",
    rentalPrice: 5.99,
    rentalDuration: 7,
    startDate: "2024-07-05T09:00:00Z",
    dueDate: "2024-07-12T09:00:00Z",
    status: "Active",
    seller: "SciFiFan",
  },
  {
    id: "RENT-20240620-002",
    bookId: 6,
    title: "Educated",
    author: "Tara Westover",
    image: "/placeholder.svg?height=300&width=200",
    rentalPrice: 3.99,
    rentalDuration: 14,
    startDate: "2024-06-20T11:00:00Z",
    dueDate: "2024-07-04T11:00:00Z",
    status: "Returned",
    seller: "MemoirLover",
  },
]
