import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/helpers/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-xl font-bold transition-opacity disabled:cursor-not-allowed disabled:opacity-50 shadow-floating-sm",
  {
    variants: {
      variant: {
        white: "bg-gs4 text-gs1",
        black: "bg-black-grad text-gs6",
      },
      size: {
        md: "h-13 w-[243px] text-[17px]",
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
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  label: string;
}

export const Button = ({ label, className, variant, size, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {label}
    </button>
  );
};
