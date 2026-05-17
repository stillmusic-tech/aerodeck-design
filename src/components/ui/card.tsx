import * as React from "react";
import { cn } from "../../lib/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export type CardVariant = "default" | "elevated" | "interactive";

interface CardProps extends DivProps {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-surface",
  elevated: "bg-surface-elevated",
  interactive:
    "bg-surface cursor-pointer transition-colors duration-200 ease-interaction hover:bg-surface-elevated focus-within:bg-surface-elevated",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-8 pb-4", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-medium leading-tight text-fg", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  ParagraphProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-relaxed text-fg-muted", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-8 pb-8", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 px-8 pb-8 pt-4", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
