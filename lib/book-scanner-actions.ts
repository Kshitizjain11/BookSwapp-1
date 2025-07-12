"use server"

import type { Book } from "./types"

// Simulated book data for demonstration
const mockBooks: Record<string, Partial<Book>> = {
  "978-0525559474": {
    title: "The Midnight Library",
    author: "Matt Haig",
    publisher: "Viking",
    edition: "First Edition",
    pages: 304,
    language: "English",
    genre: "Fiction",
    isbn: "978-0525559474",
    image: "/placeholder.svg?height=300&width=200",
  },
  "978-0735211292": {
    title: "Atomic Habits",
    author: "James Clear",
    publisher: "Avery",
    edition: "Reprint",
    pages: 320,
    language: "English",
    genre: "Self-Help",
    isbn: "978-0735211292",
    image: "/placeholder.svg?height=300&width=200",
  },
  // Add more mock data as needed
}

export async function fetchBookDetailsByISBN(isbn: string): Promise<Partial<Book>> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const book = mockBooks[isbn]
  if (book) {
    return book
  } else {
    // Simulate a generic response if ISBN not found
    return {
      title: "Unknown Book",
      author: "Unknown Author",
      publisher: "Unknown Publisher",
      edition: "N/A",
      pages: 0,
      language: "English",
      genre: "General",
      isbn: isbn,
      image: "/placeholder.svg?height=300&width=200",
    }
  }
}

export async function fetchBookDetailsByImage(imageData: string): Promise<Partial<Book>> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real scenario, imageData would be sent to an image recognition AI
  // For this simulation, we'll return a fixed mock book
  console.log("Simulating image recognition for:", imageData.substring(0, 50) + "...") // Log part of the image data

  return {
    title: "Simulated Image Scan Book",
    author: "AI Vision",
    publisher: "AI Publishers",
    edition: "Digital",
    pages: 250,
    language: "English",
    genre: "Technology",
    isbn: "SIMULATED-ISBN-123",
    image: "/placeholder.svg?height=300&width=200",
  }
}
