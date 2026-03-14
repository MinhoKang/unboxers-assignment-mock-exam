import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import { LogoBlack } from "@/shared/icons";

export const TutorialHeader = () => {
  return (
    <header className="bg-gs6 sticky top-0 z-10 grid grid-cols-3 items-center px-6 py-[12.5px]">
      <LogoBlack />
      <h2 className="text-logo-black mx-auto text-xl font-bold">모의고사 모드</h2>
      <div className="flex items-center justify-end gap-x-4">
        <Dropdown
          label="신희철 학생"
          items={[
            { label: "신희철 학생", value: "신희철 학생" },
            { label: "강민호 학생", value: "강민호 학생" },
          ]}
        />
        <button className="px-4 py-3">
          <span className="text-gs1 text-[17px] font-bold">홈으로</span>
        </button>
      </div>
    </header>
  );
};
