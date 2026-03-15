import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";

interface OMRInputsTitleProps {
  title: string;
}

export const OMRInputsTitle = ({ title }: OMRInputsTitleProps) => {
  return (
    <div
      className="border-inbrain-lightblue bg-omr-bg flex items-center justify-center border-t-[1.5px] border-r-[1.5px] border-b-[1.5px]"
      style={{ height: OMR_STYLES.HEADER_HEIGHT }}
    >
      <span className="text-inbrain-blue flex text-[18px] font-bold">
        {title.split("").map((char, index) => (
          <span key={`${char}-${index}`} className={cn(index < title.length - 1 && "mr-5.5")}>
            {char}
          </span>
        ))}
      </span>
    </div>
  );
};
