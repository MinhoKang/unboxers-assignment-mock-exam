import { motion } from "motion/react";

import { ChevronUp } from "@/shared/icons";

interface GuideCommentProps {
  comment: string;
}

export const GuideComment = ({ comment }: GuideCommentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
      >
        <ChevronUp />
      </motion.div>
      <p className="text-gs1 text-[19px] font-bold">{comment}</p>
    </div>
  );
};
