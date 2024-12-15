import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <span className={cn(
      "inline-flex items-center text-sm font-medium",
      className
    )}>
      {children}
    </span>
  )
}