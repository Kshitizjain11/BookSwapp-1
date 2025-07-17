"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function RentalConfirmationModal({ 
  isOpen, 
  onClose, 
  book,
  onConfirm 
}: { 
  isOpen: boolean
  onClose: () => void
  book: any
  onConfirm: (rentalData: { startDate: Date; endDate: Date; price: number }) => void
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7))
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const [duration, setDuration] = useState(1) // Default to 1 week

  const calculateEndDate = (start: Date, weeks: number) => {
    const date = new Date(start)
    date.setDate(date.getDate() + (weeks * 7))
    return date
  }

  const handleDurationChange = (weeks: number) => {
    setDuration(weeks)
    if (startDate) {
      setEndDate(calculateEndDate(startDate, weeks))
    }
  }

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date)
    if (date) {
      setEndDate(calculateEndDate(date, duration))
    }
    setShowStartCalendar(false)
  }

  const handleConfirm = () => {
    if (startDate && endDate) {
      onConfirm({
        startDate,
        endDate,
        price: book.rentPrice * duration
      })
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rental Details</DialogTitle>
          <DialogDescription>
            Confirm your rental for <span className="font-semibold">{book.title}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Rental Duration */}
          <div className="space-y-2">
            <h4 className="font-medium">Rental Duration</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((weeks) => (
                <Button
                  key={weeks}
                  variant={duration === weeks ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleDurationChange(weeks)}
                >
                  {weeks} {weeks === 1 ? 'Week' : 'Weeks'}
                </Button>
              ))}
            </div>
          </div>

          {/* Start Date Picker */}
          <div className="space-y-2">
            <h4 className="font-medium">Start Date</h4>
            <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date Display */}
          <div className="space-y-2">
            <h4 className="font-medium">End Date</h4>
            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {endDate ? format(endDate, "PPP") : "Select start date first"}
            </div>
          </div>

          {/* Price Summary */}
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <div className="flex justify-between">
              <span>Rental Price:</span>
              <span className="font-medium">${book.rentPrice}/week</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{duration} {duration === 1 ? 'Week' : 'Weeks'}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total:</span>
              <span>${(book.rentPrice * duration).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!startDate || !endDate}
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
          >
            Confirm Rental - ${(book.rentPrice * duration).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
