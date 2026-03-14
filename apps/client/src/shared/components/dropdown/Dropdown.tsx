import { ArrowDown } from "@/shared/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";

interface DropdownItem {
  label: string;
  value: string;
  onSelect?: () => void;
}

interface DropdownProps {
  label: string;
  items?: DropdownItem[];
}

export const Dropdown = ({ label, items = [] }: Readonly<DropdownProps>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex min-w-[200px] cursor-pointer items-center justify-between gap-4 rounded-xl bg-white px-5 py-3 outline-none">
          <span className="text-gs1 text-[17px] font-bold">{label}</span>
          {/* 열리면 위로 회전 */}
          <ArrowDown />
        </button>
      </DropdownMenuTrigger>
      {items.length > 0 && (
        <DropdownMenuContent align="end" className="min-w-[200px] rounded-xl border-none shadow-lg">
          {items.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onSelect={item.onSelect}
              className="text-gs1 px-4 py-3 text-[17px] font-bold"
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
