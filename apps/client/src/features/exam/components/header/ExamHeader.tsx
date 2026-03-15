import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/button/Button";
import { ExitLine } from "@/shared/icons";

import { ExamExitConfirmDialog } from "./ExamExitConfirmDialog";

interface ExamHeaderProps {
  shouldConfirmExit?: boolean;
}

export const ExamHeader = ({ shouldConfirmExit = true }: Readonly<ExamHeaderProps>) => {
  const navigate = useNavigate();
  const handleExit = () => navigate("/");

  return (
    <header className="ml-auto">
      {shouldConfirmExit ? (
        <ExamExitConfirmDialog onConfirmExit={handleExit} />
      ) : (
        <Button
          label="종료하기"
          variant="white"
          size="compact"
          className="gap-x-1.5"
          iconOptions={{ icon: <ExitLine />, position: "right" }}
          onClick={handleExit}
        />
      )}
    </header>
  );
};
