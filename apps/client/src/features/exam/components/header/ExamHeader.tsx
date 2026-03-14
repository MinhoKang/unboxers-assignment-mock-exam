import { ExitLine } from "@/shared/icons";

export const ExamHeader = () => {
  return (
    <header className="ml-auto">
      <button className="bg-gs6 flex h-11 items-center justify-center gap-x-1.5 rounded-xl px-4 py-3">
        <span className="text-gs1 text-[17px] font-bold">종료하기</span>
        <ExitLine />
      </button>
    </header>
  );
};
