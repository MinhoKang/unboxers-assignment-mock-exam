import { Button } from "@/shared/components/button/Button";
import { ExitLine } from "@/shared/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/AlertDialog";

const EXIT_CONFIRM_MESSAGE = "아직 답안을 제출하지 않았어요.";
const EXIT_CONFIRM_QUESTION = "정말 시험을 종료할까요?";

interface ExamExitConfirmDialogProps {
  onConfirmExit: () => void;
}

export const ExamExitConfirmDialog = ({ onConfirmExit }: Readonly<ExamExitConfirmDialogProps>) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          label="종료하기"
          variant="white"
          size="compact"
          className="gap-x-1.5"
          iconOptions={{ icon: <ExitLine />, position: "right" }}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="h-[157px] max-w-[400px] px-5 py-5 sm:px-5 sm:py-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[16px] leading-[1.35] tracking-[-0.03em] sm:text-[16px]">
            {EXIT_CONFIRM_MESSAGE}
            <br />
            {EXIT_CONFIRM_QUESTION}
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            현재 시험을 종료하고 로그인 화면으로 이동합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 w-full gap-3">
          <AlertDialogCancel asChild>
            <Button
              label="취소"
              variant="white"
              size="compact"
              className="h-12 flex-1 rounded-[16px] border border-[#ececec] text-[16px] shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
            />
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              label="나가기"
              size="compact"
              className="h-12 flex-1 rounded-[16px] text-[16px] shadow-[0_16px_28px_rgba(0,0,0,0.18)]"
              onClick={onConfirmExit}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
