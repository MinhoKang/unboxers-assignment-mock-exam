import { cn } from "@/shared/helpers/cn";

interface OMRContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const OMRContainer = ({ children, className }: OMRContainerProps) => {
  return (
    <div
      className={cn(
        "bg-omr-bg shadow-floating-sm w-fit rounded-4xl px-6 pt-[16.5px] pb-1",
        className,
      )}
    >
      {children}
    </div>
  );
};
