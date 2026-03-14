import { Button } from "@/shared/components/button/Button";
import { ChevronLeft } from "@/shared/icons";

interface FooterButtonsProps {
  isNextButtonClickable: boolean;
  handleClickPreviousButton: () => void;
  handleClickNextButton: () => void;
}

export const FooterButtons = ({
  isNextButtonClickable,
  handleClickPreviousButton,
  handleClickNextButton,
}: FooterButtonsProps) => {
  return (
    <div className="mx-auto flex w-[1200px] items-center justify-between gap-x-4">
      <Button
        label="이전으로"
        variant="white"
        iconOptions={{ icon: <ChevronLeft />, position: "left" }}
        onClick={handleClickPreviousButton}
      />
      <div className="flex items-center gap-x-3">
        {/* TODO: 튜토리얼 건너뛰기 버튼 추가 */}
        <Button label="튜토리얼 건너뛰기" variant="white" className="flex-1" />
        <Button
          label="다음"
          variant="black"
          className="flex-1"
          disabled={!isNextButtonClickable}
          onClick={handleClickNextButton}
        />
      </div>
    </div>
  );
};
