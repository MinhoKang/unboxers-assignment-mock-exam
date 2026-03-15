import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/shared/helpers/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-xl font-bold shadow-floating-xs transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-inbrain-lightblue)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        white: "bg-gs6 text-gs1",
        black: "bg-black-grad text-gs6",
      },
      size: {
        md: "h-13 w-[243px] text-[17px]",
        compact: "h-11 px-4 py-3 text-[17px]",
        dialog: "min-h-[78px] w-full px-6 text-[20px] sm:min-h-[92px] sm:text-[28px]",
      },
      disabled: {
        true: "bg-gs5 text-gs3 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled">,
    VariantProps<typeof buttonVariants> {
  label: string;
  iconOptions?: {
    icon: React.ReactNode;
    position: "left" | "right";
  };
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, iconOptions, className, variant, size, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, disabled: disabled ?? false }), className)}
      disabled={disabled ?? false}
      type={type}
      {...props}
    >
      {iconOptions?.position === "left" && iconOptions.icon}
      {label}
      {iconOptions?.position === "right" && iconOptions.icon}
    </button>
  );
});
