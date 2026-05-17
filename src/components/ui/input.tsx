import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const inputVariants = cva(
  [
    "flex w-full rounded-lg border bg-surface text-fg",
    "transition-colors duration-200 ease-interaction",
    "placeholder:text-fg-dim",
    "border-border",
    "hover:border-fg-dim",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:border-focus-ring",
    "disabled:opacity-50 disabled:pointer-events-none",
    "aria-invalid:border-feedback-error aria-invalid:focus-visible:ring-feedback-error",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      inputSize: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3 text-base",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: { inputSize: "md" },
  },
);

type InputBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;

export interface InputProps
  extends InputBaseProps,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ inputSize }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
