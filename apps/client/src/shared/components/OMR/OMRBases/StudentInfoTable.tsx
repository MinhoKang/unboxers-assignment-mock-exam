import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";

interface StudentInfoTableProps {
  examTitle: string;
  subject: string;
  studentName: string;
  schoolName: string;
  seatNumber: number;
  supervisorName: string;
}

export const StudentInfoTable = ({
  examTitle,
  subject,
  studentName,
  schoolName,
  seatNumber,
  supervisorName,
}: StudentInfoTableProps) => {
  const studentInfoRows = [
    { label: "시험", value: examTitle },
    { label: "과목", value: subject },
    { label: "성명", value: studentName },
    { label: "학교", value: schoolName },
    { label: "좌석", value: `${seatNumber}번` },
    { label: "감독", value: supervisorName },
  ];

  return (
    <div
      className="border-inbrain-lightblue bg-omr-bg w-full shrink-0 overflow-hidden border-l-[1.5px]"
      style={{ width: OMR_STYLES.INFO_TABLE_WIDTH }}
    >
      {studentInfoRows.map((row, index) => (
        <div
          key={row.label}
          className={cn(
            "border-inbrain-lightblue grid border-b-[1.5px]",
            index === 0 && "border-t-[1.5px]",
          )}
          style={{
            height: OMR_STYLES.HEADER_HEIGHT,
            gridTemplateColumns: `${OMR_STYLES.INFO_LABEL_COLUMN_WIDTH}px 1fr`,
          }}
        >
          <div className="border-inbrain-lightblue flex items-stretch border-r-[1.5px]">
            <span className="text-inbrain-blue flex h-full w-full flex-col items-center justify-between py-[3px] text-[13px] leading-[0.95] font-bold">
              {row.label.split("").map((char) => (
                <span key={`${row.label}-${char}`} className="block">
                  {char}
                </span>
              ))}
            </span>
          </div>
          <div className="flex items-center justify-center px-3 text-center">
            {row.label === "성명" || row.label === "감독" ? (
              <span className="text-inbrain-blue flex items-center gap-[0.35em] text-[17px] font-extrabold">
                {row.value.split("").map((char, charIndex) => (
                  <span key={`${row.label}-${char}-${charIndex}`}>{char}</span>
                ))}
              </span>
            ) : (
              <span className="text-inbrain-blue text-[17px] font-extrabold">{row.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
