"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, ChevronLeft, Plus, Minus, Save } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    moveToSaveForLater,
    saveForLaterItems,
    moveToCart,
    setSaveForLaterItems,
  } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const subtotal = getCartTotal()
  const taxRate = 0.08 // 8% tax
  const tax = subtotal * taxRate
  const totalAfterDiscount = subtotal - discount
  const finalTotal = totalAfterDiscount + tax

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(subtotal * 0.1) // 10% discount
    } else if (promoCode === "FREESHIP") {
      setDiscount(5) // Example fixed shipping discount
    } else {
      setDiscount(0)
      alert("Invalid promo code!")
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/marketplace">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">Your Shopping Cart</h1>
          </div>
          <p className="text-muted-foreground">Review your items before proceeding to checkout.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <Card className="py-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/marketplace">Start Shopping</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={`${item.id}-${item.type}-${item.rentalDuration || ""}`}>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-24 h-32 object-cover rounded-md"
                    />
                    <div className="flex-1 grid gap-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.author}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">
                          {item.type === "buy" ? formatPrice(item.price) : `${formatPrice(item.rentPrice!)}/week`}
                        </span>
                        {item.type === "rent" && item.rentalDuration && (
                          <span className="text-muted-foreground">({item.rentalDuration} weeks)</span>
                        )}
                        <span className="text-muted-foreground"> • {item.condition}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent border-muted-foreground/20 hover:border-muted-foreground/40"
                          onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, item.type, Number.parseInt(e.target.value))}
                          className="w-16 text-center"
                          min={1}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent border-muted-foreground/20 hover:border-muted-foreground/40"
                          onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-xl">
                        {formatPrice(
                          item.type === "buy"
                            ? item.price * item.quantity
                            : item.rentPrice! * item.rentalDuration! * item.quantity,
                        )}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveToSaveForLater(item.id, item.type)}
                          title="Save for Later"
                          className="text-muted-foreground hover:text-amber-600"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id, item.type)}
                          title="Remove"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {saveForLaterItems.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Saved for Later</h2>
              <div className="space-y-4">
                {saveForLaterItems.map((item) => (
                  <Card key={`${item.id}-${item.type}-${item.rentalDuration || ""}`}>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-md"
                      />
                      <div className="flex-1 grid gap-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.author}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">
                            {item.type === "buy" ? formatPrice(item.price) : `${formatPrice(item.rentPrice!)}/week`}
                          </span>
                          {item.type === "rent" && item.rentalDuration && (
                            <span className="text-muted-foreground">({item.rentalDuration} weeks)</span>
                          )}
                          <span className="text-muted-foreground"> • {item.condition}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveToCart(item.id, item.type)}
                          className="flex items-center gap-1 border-amber-600 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                        >
                          <ShoppingCart className="h-4 w-4" /> Move to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setSaveForLaterItems((prev) =>
                              prev.filter((sflItem) => !(sflItem.id === item.id && sflItem.type === item.type)),
                            )
                          }
                          title="Remove from Save for Later"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({taxRate * 100}%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="pr-10 border-muted-foreground/20 focus:border-amber-500"
                />
                <Button onClick={applyPromoCode} className="w-full bg-amber-600 hover:bg-amber-700">
                  Apply Promo Code
                </Button>
              </div>
              <Button
                asChild
                className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
                disabled={cartItems.length === 0}
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
