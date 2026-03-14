import { useState } from "react";

import { CircleCheck, MessageReport } from "@/shared/icons";

export const HelpButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const buttonLabel = isClicked ? "선생님 호출 완료!" : "문제가 생겼나요?";
  const buttonIcon = isClicked ? <CircleCheck /> : <MessageReport />;

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <button
      className="bg-gs6 flex w-50 shrink-0 items-center justify-center gap-x-2 rounded-xl"
      onClick={handleClick}
    >
      {buttonIcon}
      <span className="text-gs1 text-[17px] font-bold">{buttonLabel}</span>
    </button>
  );
};
