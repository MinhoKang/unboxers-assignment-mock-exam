import { OMR_STYLES } from "@/shared/constants/omrStyles";

export const ReaderMark = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-gs1 h-6" style={{ width: OMR_STYLES.READER_MARK_WIDTH }} />
    </div>
  );
};
