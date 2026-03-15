import { OMRObjectiveButton } from "./OMRObjectiveButton";

interface StudentInfoSectionProps {
  studentNumber?: { tens: number | null; ones: number | null };
  onNumberChange?: (digit: "tens" | "ones", value: number) => void;
}

const STUDENT_INFO = {
  exam: "TEN-UP 모의고사",
  subject: "공통수학2",
  name: "권 성 민",
  school: "베방고등학교",
  seat: "21번",
  supervisor: "신 희 철",
};

export const StudentInfoSection = ({
  studentNumber = { tens: null, ones: null },
  onNumberChange,
}: StudentInfoSectionProps) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);

  const handleNumberSelect = (digit: "tens" | "ones", value: number) => {
    onNumberChange?.(digit, value);
  };

  return (
    <div className="bg-omr-bg border-inbrain-lightblue w-fit border-2">
      {/* 개인정보 테이블 */}
      <div className="border-inbrain-lightblue divide-inbrain-lightblue divide-y-[1.5px] border-b-[1.5px]">
        {/* 시험 */}
        <div className="flex">
          <div className="bg-inbrain-lightblue/20 border-r-inbrain-lightblue flex w-16 items-center justify-center border-r-[1.5px] py-3">
            <span className="text-inbrain-blue text-xs font-bold">시험</span>
          </div>
          <div className="flex w-40 items-center px-3 py-3">
            <span className="text-gs1 text-sm font-medium">{STUDENT_INFO.exam}</span>
          </div>
        </div>

        {/* 과목 */}
        <div className="flex">
          <div className="bg-inbrain-lightblue/20 border-r-inbrain-lightblue flex w-16 items-center justify-center border-r-[1.5px] py-3">
            <span className="text-inbrain-blue text-xs font-bold">과목</span>
          </div>
          <div className="flex w-40 items-center px-3 py-3">
            <span className="text-gs1 text-sm font-medium">{STUDENT_INFO.subject}</span>
          </div>
        </div>

        {/* 성명 */}
        <div className="flex">
          <div className="bg-inbrain-lightblue/20 border-r-inbrain-lightblue flex w-16 items-center justify-center border-r-[1.5px] py-3">
            <span className="text-inbrain-blue text-xs font-bold">성명</span>
          </div>
          <div className="flex w-40 items-center px-3 py-3">
            <span className="text-gs1 text-sm font-medium">{STUDENT_INFO.name}</span>
          </div>
        </div>

        {/* 학교 */}
        <div className="flex">
          <div className="bg-inbrain-lightblue/20 border-r-inbrain-lightblue flex w-16 items-center justify-center border-r-[1.5px] py-3">
            <span className="text-inbrain-blue text-xs font-bold">학교</span>
          </div>
          <div className="flex w-40 items-center px-3 py-3">
            <span className="text-gs1 text-sm font-medium">{STUDENT_INFO.school}</span>
          </div>
        </div>

        {/* 좌석 */}
        <div className="flex">
          <div className="bg-inbrain-lightblue/20 border-r-inbrain-lightblue flex w-16 items-center justify-center border-r-[1.5px] py-3">
            <span className="text-inbrain-blue text-xs font-bold">좌석</span>
          </div>
          <div className="flex w-40 items-center px-3 py-3">
            <span className="text-gs1 text-sm font-medium">{STUDENT_INFO.seat}</span>
          </div>
        </div>

        {/* 감독 */}
        <div className="flex">
          <div className="bg-inbrain-lightblue/20 border-r-inbrain-lightblue flex w-16 items-center justify-center border-r-[1.5px] py-3">
            <span className="text-inbrain-blue text-xs font-bold">감독</span>
          </div>
          <div className="flex w-40 items-center px-3 py-3">
            <span className="text-gs1 text-sm font-medium">{STUDENT_INFO.supervisor}</span>
          </div>
        </div>
      </div>

      {/* 번호 입력 섹션 */}
      <div className="p-4">
        <div className="bg-inbrain-lightblue/20 border-inbrain-lightblue mb-4 border-[1.5px] py-2">
          <div className="text-center">
            <span className="text-inbrain-blue text-sm font-bold">번호</span>
          </div>
        </div>

        <div className="flex justify-center gap-x-8">
          {/* 십의 자리 */}
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <span className="text-inbrain-blue text-xs font-bold">1</span>
            </div>
            <div className="flex flex-col gap-y-0.5">
              {numbers.map((num) => (
                <OMRObjectiveButton
                  key={`tens-${num}`}
                  number={num}
                  isSelected={studentNumber.tens === num}
                  onSelect={() => handleNumberSelect("tens", num)}
                />
              ))}
            </div>
          </div>

          {/* 일의 자리 */}
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <span className="text-inbrain-blue text-xs font-bold">0</span>
            </div>
            <div className="flex flex-col gap-y-0.5">
              {numbers.map((num) => (
                <OMRObjectiveButton
                  key={`ones-${num}`}
                  number={num}
                  isSelected={studentNumber.ones === num}
                  onSelect={() => handleNumberSelect("ones", num)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
