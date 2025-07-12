export type Condition = "New" | "Like New" | "Good" | "Acceptable"

export interface Book {
  id: number
  title: string
  author: string
  price: number
  rentPrice?: number
  rating: number
  reviews: number
  condition: Condition
  image: string
  seller: string
  location: string
  isRentable: boolean
  category: string
  genre: string
  publishYear: number
  badges: string[]
  isbn: string
  publisher?: string
  edition?: string
  pages?: number
  language?: string
}

export interface CartItem extends Book {
  quantity: number
  type: "buy" | "rent" // Indicates if the item is for buying or renting
  rentalDuration?: number // In days, if type is 'rent'
}

export interface Order {
  id: string
  items: {
    bookId: number
    title: string
    author: string
    price: number
    image: string
    quantity: number
    type: "buy" | "rent"
    rentalDuration?: number
  }[]
  totalAmount: number
  status: "Paid" | "Delivered" | "Shipped" | "Cancelled"
  orderDate: string
  paymentMethod: "Credit Card" | "UPI" | "Wallet"
  deliveryAddress?: string // For purchased books
}

export interface Rental {
  id: string
  bookId: number
  title: string
  author: string
  image: string
  rentalPrice: number
  rentalDuration: number // In days
  startDate: string
  dueDate: string
  status: "Active" | "Returned" | "Overdue" | "Cancelled"
  seller: string
}
