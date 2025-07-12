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
