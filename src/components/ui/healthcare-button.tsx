import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const healthcareButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-card hover:bg-primary-dark hover:shadow-elevated",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-border bg-background shadow-sm hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground shadow-card hover:bg-success/90 hover:shadow-elevated",
        warning: "bg-warning text-warning-foreground shadow-card hover:bg-warning/90 hover:shadow-elevated",
        medical: "bg-gradient-primary text-primary-foreground shadow-elevated hover:shadow-elevated hover:scale-105",
        accent: "bg-accent text-accent-foreground shadow-card hover:bg-accent-light hover:shadow-elevated",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface HealthcareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof healthcareButtonVariants> {
  asChild?: boolean
}

const HealthcareButton = React.forwardRef<HTMLButtonElement, HealthcareButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(healthcareButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
HealthcareButton.displayName = "HealthcareButton"

export { HealthcareButton, healthcareButtonVariants }