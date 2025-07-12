"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Upload, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SmartScannerProps {
  onScanComplete: (type: "barcode" | "image", value: string) => void
  isScanning: boolean
}

export function SmartScanner({ onScanComplete, isScanning }: SmartScannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [barcodeInput, setBarcodeInput] = useState("")

  const handleManualAutofill = () => {
    if (barcodeInput.trim()) {
      onScanComplete("barcode", barcodeInput.trim())
    } else {
      toast({
        title: "Manual ISBN input is empty",
        description: "Please enter an ISBN to autofill.",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onScanComplete("image", reader.result as string) // Send base64 string or blob URL
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraScanSimulation = () => {
    // In a real app, this would open the device camera for barcode scanning.
    // For demonstration, we'll use a default ISBN if manual input is empty.
    const simulatedISBN = barcodeInput.trim() || "978-0525559474" // Default ISBN for demo
    onScanComplete("barcode", simulatedISBN)
    toast({
      title: "Camera Scan (Simulated)",
      description: `Simulating scan for ISBN: ${simulatedISBN}`,
    })
    setBarcodeInput(simulatedISBN) // Pre-fill manual input with simulated ISBN
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleCameraScanSimulation} className="flex-1" disabled={isScanning}>
          <Camera className="mr-2 h-4 w-4" /> Scan Barcode (Camera)
        </Button>
        <Button onClick={() => fileInputRef.current?.click()} className="flex-1" disabled={isScanning}>
          <Upload className="mr-2 h-4 w-4" /> Upload Cover Image
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            disabled={isScanning}
          />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Label htmlFor="barcode-manual">Manual ISBN Entry</Label>
          <Input
            id="barcode-manual"
            placeholder="Enter ISBN (e.g., 978-0525559474)"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            disabled={isScanning}
          />
        </div>
        <Button onClick={handleManualAutofill} disabled={isScanning}>
          {isScanning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isScanning ? "Scanning..." : "Autofill"}
        </Button>
      </div>
      {isScanning && <p className="text-center text-sm text-muted-foreground">Fetching book details...</p>}
    </div>
  )
}
