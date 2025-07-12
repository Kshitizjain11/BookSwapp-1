"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SmartScanner } from "@/components/smart-scanner"
import { ImageUpload } from "@/components/image-upload"
import { ConditionSelector } from "@/components/condition-selector"
import type { Book, Condition } from "@/lib/types" // Assuming these types are defined
import { fetchBookDetailsByISBN, fetchBookDetailsByImage } from "@/lib/book-scanner-actions"
import { toast } from "@/components/ui/use-toast"
import { MapPin, DollarSign, BookOpen, GraduationCap, ImageIcon, Package, Repeat } from "lucide-react"
import { Scan } from "lucide-react"
import { SlidersHorizontal } from "lucide-react"

export default function SellBookPage() {
  const [bookDetails, setBookDetails] = useState<Partial<Book>>({
    title: "",
    author: "",
    publisher: "",
    edition: "",
    pages: 0,
    language: "",
    genre: "",
    isbn: "",
  })
  const [condition, setCondition] = useState<Condition>("Good")
  const [conditionNotes, setConditionNotes] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [isFree, setIsFree] = useState(false)
  const [isRentable, setIsRentable] = useState(false)
  const [rentalPrice, setRentalPrice] = useState("") // New state for rental price
  const [buybackGuarantee, setBuybackGuarantee] = useState(false)
  const [college, setCollege] = useState("")
  const [semester, setSemester] = useState("")
  const [subject, setSubject] = useState("")
  const [location, setLocation] = useState("")
  const [ecoFriendlyPackaging, setEcoFriendlyPackaging] = useState(false)
  const [autoRelist, setAutoRelist] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [isScanning, setIsScanning] = useState(false)

  const handleScanComplete = async (type: "barcode" | "image", value: string) => {
    setIsScanning(true)
    try {
      let fetchedDetails: Partial<Book> = {}
      if (type === "barcode") {
        fetchedDetails = await fetchBookDetailsByISBN(value)
      } else {
        fetchedDetails = await fetchBookDetailsByImage(value) // value here would be a base64 image or URL
      }

      setBookDetails((prev) => ({ ...prev, ...fetchedDetails }))
      toast({
        title: "Book details autofilled!",
        description: "Review and edit the details as needed.",
      })
    } catch (error) {
      console.error("Error fetching book details:", error)
      toast({
        title: "Failed to fetch book details",
        description: "Please enter details manually or try scanning again.",
        variant: "destructive",
      })
    } finally {
      setIsScanning(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send all the form data to your backend
    console.log({
      bookDetails,
      condition,
      conditionNotes,
      sellingPrice,
      isFree,
      isRentable,
      rentalPrice, // Include rentalPrice in submission
      buybackGuarantee,
      college,
      semester,
      subject,
      location,
      ecoFriendlyPackaging,
      autoRelist,
      images,
    })
    toast({
      title: "Book listed successfully!",
      description: "Your book is now available in the marketplace.",
    })
    // Reset form or redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">List Your Book</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Smart Scanner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5" /> Smart Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Scan a barcode or upload a book cover image to automatically fill in book details.
            </p>
            <SmartScanner onScanComplete={handleScanComplete} isScanning={isScanning} />
          </CardContent>
        </Card>

        {/* Book Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Book Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={bookDetails.title || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={bookDetails.author || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                value={bookDetails.publisher || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edition">Edition</Label>
              <Input
                id="edition"
                value={bookDetails.edition || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, edition: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="pages">Number of Pages</Label>
              <Input
                id="pages"
                type="number"
                value={bookDetails.pages || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, pages: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={bookDetails.language || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre/Category</Label>
              <Input
                id="genre"
                value={bookDetails.genre || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, genre: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={bookDetails.isbn || ""}
                onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Academic Information (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="college">College/University</Label>
              <Input id="college" value={college} onChange={(e) => setCollege(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Input id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Availability Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" /> Pricing & Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="selling-price">Selling Price</Label>
              <Input
                id="selling-price"
                type="number"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="e.g., 15.99"
                disabled={isFree}
                required={!isFree}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="is-free" checked={isFree} onCheckedChange={setIsFree} />
              <Label htmlFor="is-free">Give for Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="is-rentable" checked={isRentable} onCheckedChange={setIsRentable} />
              <Label htmlFor="is-rentable">Also make available for rent</Label>
            </div>
            {isRentable && ( // Conditionally render rental price input
              <div>
                <Label htmlFor="rental-price">Rental Price (per day/week)</Label>
                <Input
                  id="rental-price"
                  type="number"
                  step="0.01"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(e.target.value)}
                  placeholder="e.g., 2.50"
                  required
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox id="buyback-guarantee" checked={buybackGuarantee} onCheckedChange={setBuybackGuarantee} />
              <Label htmlFor="buyback-guarantee">Offer Buyback Guarantee</Label>
            </div>
          </CardContent>
        </Card>

        {/* Condition Selector Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Book Condition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ConditionSelector selectedCondition={condition} onSelectCondition={setCondition} />
            <div>
              <Label htmlFor="condition-notes">Detailed Condition Notes (Optional)</Label>
              <Textarea
                id="condition-notes"
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                placeholder="e.g., Minor wear on cover, no highlights inside."
              />
            </div>
          </CardContent>
        </Card>

        {/* Images Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Upload multiple images (cover, back, inside pages).</p>
            <ImageUpload images={images} setImages={setImages} />
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="location">Your Location (Auto-detected or Manual Entry)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, Mission District"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Your precise location will be used for local buyers.</p>
          </CardContent>
        </Card>

        {/* Additional Options Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" /> Additional Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="eco-friendly" checked={ecoFriendlyPackaging} onCheckedChange={setEcoFriendlyPackaging} />
              <Label htmlFor="eco-friendly" className="flex items-center gap-2">
                <Package className="w-4 h-4" /> Eco-friendly packaging
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-relist" checked={autoRelist} onCheckedChange={setAutoRelist} />
              <Label htmlFor="auto-relist" className="flex items-center gap-2">
                <Repeat className="w-4 h-4" /> Auto-relist if unsold after 30 days
              </Label>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-3 text-lg">
          List Book for Sale/Rent
        </Button>
      </form>
    </div>
  )
}
