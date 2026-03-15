import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { BrandName, Logo } from "@/shared/icons";

export const BrandingSection = () => {
  return (
    <div className="bg-omr-bg flex w-full flex-1 shrink-0 flex-col items-center justify-center gap-y-4 px-2 text-center">
      <div className="flex flex-col items-center gap-y-[6.73px]">
        <Logo
          size={OMR_STYLES.BRANDING_LOGO_SIZE}
          color="var(--color-inbrain-blue)"
          strongColor="var(--color-inbrain-blue)"
        />
        <BrandName />
      </div>

      <p className="text-inbrain-blue text-2xl font-bold">
        학생답안 입력용
        <br />
        OMR 카드
      </p>

      <div className="text-inbrain-blue flex flex-col gap-y-3 text-[12px] font-semibold tracking-tighter">
        <p>객관식 답안은 터치해서 칠하고, 주관식 답안은 터치한 뒤 키패드로 입력해요.</p>
        <p>답안을 작성하지 않고 제출하면 별도의 경고 없이 오답으로 처리되니 주의하세요.</p>
      </div>
    </div>
  );
};
