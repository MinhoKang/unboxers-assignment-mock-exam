const QuestionItem = () => {
  return <div className="h-[57.6px] w-[81.13px] rounded-sm bg-[#ECECEC]" />;
};

const STACK_COUNT = 5;

export const Paper = () => {
  return (
    <div
      className="relative"
      style={{
        width: 275 + STACK_COUNT * 8,
        height: 391 + STACK_COUNT * 8,
        paddingTop: STACK_COUNT * 8,
      }}
    >
      {Array.from({ length: STACK_COUNT }).map((_, i) => {
        const index = STACK_COUNT - i;

        return (
          <div
            key={i}
            className="border-gs4 bg-gs4 shadow-floating-sm absolute h-[391px] w-[275px] rounded-lg border-[3px]"
            style={{ top: STACK_COUNT * 8 - index * 8, left: index * 8 }}
          />
        );
      })}
      <div
        className="shadow-floating-sm border-gs4 absolute left-0 flex h-[391px] w-[275px] flex-col items-center justify-center gap-y-4 rounded-lg border-[3px] bg-white"
        style={{ top: STACK_COUNT * 8 }}
      >
        <div className="flex flex-col items-center justify-center gap-y-1">
          <p className="text-gs1 text-[14px] font-bold">실전 모의고사</p>
          <p className="text-gs1 text-4xl font-bold">공통수학2</p>
        </div>
        <div className="flex h-[262px] w-full justify-center gap-x-3">
          <div className="flex flex-1 flex-col items-end gap-y-6">
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
          </div>
          <div className="w-1 self-stretch rounded-full" style={{ backgroundColor: "#ECECEC" }} />
          <div className="flex flex-1 flex-col justify-start gap-y-12">
            <QuestionItem />
            <QuestionItem />
          </div>
        </div>
      </div>
    </div>
  );
};
