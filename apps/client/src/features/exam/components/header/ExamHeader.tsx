import { useNavigate } from "react-router-dom";

import { ExitLine } from "@/shared/icons";

export const ExamHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="ml-auto">
      <button
        className="bg-gs6 flex h-11 items-center justify-center gap-x-1.5 rounded-xl px-4 py-3"
        onClick={() => navigate("/")}
      >
        <span className="text-gs1 text-[17px] font-bold">종료하기</span>
        <ExitLine />
      </button>
    </header>
  );
};
