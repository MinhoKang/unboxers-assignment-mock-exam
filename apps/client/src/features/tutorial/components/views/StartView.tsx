import { Paper } from "@/features/tutorial/components/paper/Paper";
import { Button } from "@/shared/components/button/Button";

export const StartView = ({ onStepChange }: { onStepChange: (step: number) => void }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-12">
      <div className="flex flex-col items-center justify-center gap-y-12 py-[90.89px]">
        <Paper />
        <p className="text-gs1 text-center text-4xl font-extrabold">
          모의고사 모드는 처음이시죠? 실전 모의고사는 <br /> 실전과 최대한 비슷한 환경으로 진행돼요
        </p>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="white" size="md" label="이전" onClick={() => onStepChange(1)} />
        {/* TODO: 전체 ORM 작업 후 추가 페이지 작업 필요 */}
        <Button variant="black" size="md" label="시작하기" onClick={() => onStepChange(2)} />
      </div>
    </div>
  );
};
