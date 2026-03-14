import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/helpers/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-xl font-bold transition-opacity shadow-floating-xs",
  {
    variants: {
      variant: {
        white: "bg-gs6 text-gs1",
        black: "bg-black-grad text-gs6",
      },
      size: {
        md: "h-13 w-[243px] text-[17px]",
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

export const Button = ({
  label,
  iconOptions,
  className,
  variant,
  size,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, disabled: disabled ?? false }), className)}
      disabled={disabled ?? false}
      {...props}
    >
      {iconOptions?.position === "left" && iconOptions.icon}
      {label}
      {iconOptions?.position === "right" && iconOptions.icon}
    </button>
  );
};
