"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles, CheckCircle, MinusCircle, XCircle } from "lucide-react"

export type Condition = "New" | "Like New" | "Good" | "Acceptable"

interface ConditionSelectorProps {
  selectedCondition: Condition
  onSelectCondition: (condition: Condition) => void
}

export function ConditionSelector({ selectedCondition, onSelectCondition }: ConditionSelectorProps) {
  const conditions: { value: Condition; label: string; icon: React.ElementType; description: string }[] = [
    { value: "New", label: "New", icon: Sparkles, description: "Unopened, original packaging." },
    { value: "Like New", label: "Like New", icon: CheckCircle, description: "Read once, no visible flaws." },
    { value: "Good", label: "Good", icon: MinusCircle, description: "Minor wear, no major damage." },
    { value: "Acceptable", label: "Acceptable", icon: XCircle, description: "Significant wear, readable." },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {conditions.map((cond) => (
        <Button
          key={cond.value}
          variant="outline"
          className={cn(
            "flex flex-col h-auto p-4 text-left items-start justify-start gap-2",
            selectedCondition === cond.value && "border-amber-500 ring-2 ring-amber-200 bg-amber-50 dark:bg-amber-950",
          )}
          onClick={() => onSelectCondition(cond.value)}
        >
          <div className="flex items-center gap-2">
            <cond.icon
              className={cn("w-5 h-5", selectedCondition === cond.value ? "text-amber-600" : "text-muted-foreground")}
            />
            <span className="font-semibold text-base">{cond.label}</span>
          </div>
          <p className="text-sm text-muted-foreground">{cond.description}</p>
        </Button>
      ))}
    </div>
  )
}
