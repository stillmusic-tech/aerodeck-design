import * as React from "react";
import { cn } from "../../lib/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-fg select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-0.5 text-feedback-error">
          *
        </span>
      ) : null}
    </label>
  ),
);
Label.displayName = "Label";

interface FieldHintProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "hint" | "error";
}

export const FieldHint = React.forwardRef<HTMLParagraphElement, FieldHintProps>(
  ({ className, variant = "hint", ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm leading-relaxed",
        variant === "hint" ? "text-fg-dim" : "text-feedback-error",
        className,
      )}
      {...props}
    />
  ),
);
FieldHint.displayName = "FieldHint";
